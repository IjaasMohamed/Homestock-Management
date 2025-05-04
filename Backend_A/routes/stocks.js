const express = require('express');
const router = express.Router();
const { Stock, categories } = require('../models/stock');
const mongoose = require('mongoose');

// GET all stock items
router.get('/', async (req, res) => {
    try {
        const stocks = await Stock.find().sort({ createdAt: -1 });//retrieve all stock from mongodb
        res.json(stocks);//send data as JSON response
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET all categories
router.get('/categories', (req, res) => {
    res.json(categories);
});

// GET stock items by category
router.get('/category/:category', async (req, res) => {
    try {
        if (!categories.includes(req.params.category)) {
            return res.status(400).json({ message: 'Invalid category' });
        }
        
        const stocks = await Stock.find({ categoryName: req.params.category });
        res.json(stocks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET items that are low in stock (quantity < 10)
router.get('/low-stock', async (req, res) => {
    try {
        const lowStockItems = await Stock.find({ stockQuantity: { $lt: 10 } });
        res.json(lowStockItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET items that are expiring soon (within 30 days)
router.get('/expiring-soon', async (req, res) => {
    try {
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

        const expiringSoon = await Stock.find({
            expiredDate: {
                $lte: thirtyDaysFromNow,
                $gte: new Date()
            }
        }).sort({ expiredDate: 1 });

        res.json(expiringSoon);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// GET a single stock item
router.get('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const stock = await Stock.findById(req.params.id);
        if (!stock) {
            return res.status(404).json({ message: 'Stock item not found' });
        }
        res.json(stock);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE a new stock item
router.post('/add', async (req, res) => {
    try {
        // Validate category
        if (!categories.includes(req.body.categoryName)) {
            return res.status(400).json({ message: 'Invalid category' });
        }

        const stock = new Stock({
            categoryName: req.body.categoryName,
            itemName: req.body.itemName,
            stockQuantity: req.body.stockQuantity,
            totalAmount: req.body.totalAmount,
            expiredDate: req.body.expiredDate,
            manufactureDate: req.body.manufactureDate,
            purchaseDate: req.body.purchaseDate || new Date()
        });

        const newStock = await stock.save();
        res.status(201).json(newStock);
    } catch (err) {
        if (err.code === 11000) { // Duplicate key error
            res.status(400).json({ message: 'Item name must be unique' });
        } else {
            res.status(400).json({ message: err.message });
        }
    }
});

// UPDATE a stock item
router.put('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        // Validate category if it's being updated
        if (req.body.categoryName && !categories.includes(req.body.categoryName)) {
            return res.status(400).json({ message: 'Invalid category' });
        }

        const updatedStock = await Stock.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedStock) {
            return res.status(404).json({ message: 'Stock item not found' });
        }

        res.json(updatedStock);
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ message: 'Item name must be unique' });
        } else {
            res.status(400).json({ message: err.message });
        }
    }
});

// DELETE a stock item
router.delete('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const deletedStock = await Stock.findByIdAndDelete(req.params.id);
        if (!deletedStock) {
            return res.status(404).json({ message: 'Stock item not found' });
        }

        res.json({ message: 'Stock item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



module.exports = router;