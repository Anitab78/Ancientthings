import express from 'express';

const router = express.Router();

// Get cart (from localStorage on frontend)
router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Cart managed on frontend with localStorage'
    });
});

// Calculate cart total and taxes
router.post('/calculate', (req, res) => {
    try {
        const { items } = req.body;

        if (!items || items.length === 0) {
            return res.json({
                success: true,
                subtotal: 0,
                tax: 0,
                total: 0
            });
        }

        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = Math.round(subtotal * 0.18); // 18% GST
        const total = subtotal + tax;

        res.json({
            success: true,
            subtotal,
            tax,
            total
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

export default router;
