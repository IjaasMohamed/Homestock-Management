const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Predefined categories
const categories = [
    'Food and Beverages',
    'Cleaning Supplies',
    'Toiletries & Personal',
    'Electronics',
    'Kitchen Essentials',
    'Medical Supplies'
];

const stockSchema = new Schema({
    categoryName: {
        type: String,
        required: true,
        enum: categories, // Only allows values from the predefined categories
        trim: true
    },
    itemName: {
        type: String,
        required: true,
        trim: true,
        
    },
    stockQuantity: {
        type: Number,
        required: true,
        min: 0
    },
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    expiredDate: {
        type: Date,
        required: function() {
            // Only require expired date for certain categories
            return this.categoryName === 'Food and Beverages' || 
                   this.categoryName === 'Medical Supplies';
        },
        validate: {
            validator: function(value) {
                if (!value) return true;
                return this.manufactureDate ? value > this.manufactureDate : true;
            },
            message: 'Expired date must be after manufacture date'
        }
    },
    manufactureDate: {
        type: Date,
        required: function() {
            // Only require manufacture date for certain categories
            return this.categoryName === 'Food and Beverages' || 
                   this.categoryName === 'Medical Supplies' ||
                   this.categoryName === 'Electronics';
        }
    },
    purchaseDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Indexes for better query performance
stockSchema.index({ categoryName: 1 });
stockSchema.index({ itemName: 1 });
stockSchema.index({ expiredDate: 1 });

// Pre-save hook to update lastUpdated field
stockSchema.pre('save', function(next) {
    this.lastUpdated = new Date();
    next();
});

const Stock = mongoose.model("Stock", stockSchema);

module.exports = {
    Stock,
    categories // Exporting categories so they can be used elsewhere
};//MONGODB_URL=mongodb+srv://ashanishashikala1231:ashani123@homestock.yjezp.mongodb.net/homestock_db?retryWrites=true&w=majority&appName=HomeStock
