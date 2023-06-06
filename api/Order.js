const express = require('express');
const router = express.Router();

const { 
    createOrder,
    getAllOrdersByUserId

} = require('../DB/orders.js');

const {
    getAllOrderItemsByOrderId
} = require('../DB/orderItems.js')

// GET /api/order
router.get ('/', async (req, res, next) => {
    try {
        const user = await req.user;
        const orders = await getAllOrdersByUserId(user.id);
        res.send(orders);

    } catch (error) {
        next({ error: error});
    }
})

// GET /api/order/:orderId
router.get ('/:orderId', async (req, res, next) => {
    const { orderId } = req.params;

    try {
        const order = await getOrderById(orderId);
        res.send(order);

    } catch (error) {
        next({ error: error});
    }
})

// POST /api/order

router.post ('/', async (req, res, next) => {
    try {
        const user = await req.user;
        const newOrder = await createOrder(user.id);
        res.send(newOrder);

    } catch (error) {
        next({ error: error});
    }
})

module.exports = router;