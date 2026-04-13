import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { verifyToken } from '../middleware/auth.js';
import * as db from '../database/postgres.js';

const router = express.Router();

// Create order
router.post('/', verifyToken, async (req, res) => {
    try {
        const { items, totalPrice, shippingAddress } = req.body;
        const userId = req.userId;

        if (!items || items.length === 0) {
            return res.status(400).json({ success: false, message: 'No items in order' });
        }

        const orderId = uuidv4();
        
        // Create order
        await db.createOrder(
            orderId,
            userId,
            totalPrice,
            'confirmed',
            shippingAddress
        );

        // Add order items
        const orderItems = items.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
        }));
        await db.addOrderItems(orderId, orderItems);

        // Update product stock
        for (const item of items) {
            const product = await db.getProductById(item.id);
            if (product) {
                const newStock = product.stock - item.quantity;
                await db.updateProductStock(item.id, newStock);
            }
        }

        const order = await db.getOrderById(orderId);

        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            order
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Get user orders
router.get('/', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await db.getUserOrders(userId);

        res.json({ success: true, data: orders });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Get order by ID
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const order = await db.getOrderById(req.params.id);
        
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        if (order.user_id !== req.userId) {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }

        res.json({ success: true, data: order });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

export default router;
