import express from 'express';
import * as db from '../database/postgres.js';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await db.getProducts();
        res.json({ success: true, data: products });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Get product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await db.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json({ success: true, data: product });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Get products by category
router.get('/category/:category', async (req, res) => {
    try {
        const products = await db.getProductsByCategory(req.params.category);
        res.json({ success: true, data: products });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

export default router;
