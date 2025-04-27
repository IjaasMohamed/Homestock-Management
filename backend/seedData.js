import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { roles, users, profile, permissions, clientPermissions } from './src/config/data.js'; // Import data from data.js
import User from './src/api/models/User.js';
import Role from './src/api/models/Role.js';
import UserRole from './src/api/models/UserRole.js';
import Profile from './src/api/models/Profile.js';
import Permission from './src/api/models/Permission.js';
import ClientPermission from './src/api/models/ClientPermission.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const seedData = async () => {
  try {
    // Step 1: Clear existing data (optional, only if you want a fresh start)
    await Role.deleteMany({});
    await Permission.deleteMany({});
    await ClientPermission.deleteMany({});
    await User.deleteMany({});
    await Profile.deleteMany({});
    await UserRole.deleteMany({});
    console.log('Existing data cleared');

    // Step 2: Seed Roles
    const createdRoles = await Role.insertMany(roles);
    console.log('Roles seeded:', createdRoles.map(r => r.type));

    // Step 3: Seed Permissions
    const createdPermissions = await Permission.insertMany(permissions);
    console.log('Permissions seeded:', createdPermissions.length);

    // Step 4: Seed Client Permissions
    const createdClientPermissions = await ClientPermission.insertMany(clientPermissions);
    console.log('Client Permissions seeded:', createdClientPermissions.length);

    // Step 5: Update Roles with Permissions and Client Permissions
    const superAdminRole = createdRoles.find(role => role.type === 'SUPER_ADMIN');
    if (superAdminRole) {
      superAdminRole.permission = createdPermissions.map(p => p._id);
      superAdminRole.clientPermission = createdClientPermissions.map(cp => cp._id);
      await superAdminRole.save();
      console.log('Super Admin role updated with permissions');
    }

    // Step 6: Seed User
    const userData = { ...users }; // Copy user data from data.js
    const user = new User(userData);
    await user.save();
    console.log('User seeded:', user.email);

    // Step 7: Seed Profile
    const profileData = { ...profile, user: user._id }; // Link profile to the user
    const createdProfile = await Profile.create(profileData);
    console.log('Profile seeded for user:', user.email);

    // Step 8: Seed UserRole (link user to SUPER_ADMIN role)
    const userRole = await UserRole.create({
      user: user._id,
      role: superAdminRole._id,
    });
    console.log('UserRole seeded:', userRole);

    // Step 9: Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding data:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

// Run the seeding script
seedData();