const { client } = require("./index.js");

const createCart = async (userId) => {
    try {
        const { rows: [cart] } = await client.query(`
            INSERT INTO cart("userId")
            VALUES ($1)
            RETURNING *;
        `, [userId]);
        return cart;
    } catch (error) {
        throw error;
    }
}

const getCartByUserId = async (userId) => {
    try {
        const { rows: [cart] } = await client.query(`
            SELECT *
            FROM cart
            WHERE "userId" = $1;
        `, [userId]);
        return cart;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createCart,
    getCartByUserId
}