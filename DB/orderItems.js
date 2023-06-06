const { client } = require("./index.js");

const getAllOrderItemsByOrderId = async (orderId) => {
    try {
        const { rows: orderItems } = await client.query(`
            SELECT *
            FROM order_items
            WHERE "orderId" = $1
        `, [orderId]);
        return orderItems;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllOrderItemsByOrderId
}