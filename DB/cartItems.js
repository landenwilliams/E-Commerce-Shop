const { client } = require("./index.js");

const createCartItem = async (productId, cartId, quantity) => {
    try {
        const { rows: [cartItem] } = await client.query(`
            INSERT INTO cart_items("productId", "cartId", quantity)
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [productId, cartId, quantity]);
        
        return cartItem;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getAllCartItemsByCartId = async (cartId) => {
    try {
        const { rows: cartItems } = await client.query(`
            SELECT cart_items.*, products.name, products.description, products.price, products."imageURL"
            FROM cart_items
            JOIN products
            ON cart_items."productId" = products.id
            WHERE cart_items."cartId" = $1
        `, [cartId]);
        return cartItems;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deleteCartItemById = async (cartItemId) => {
    try {
        const { rows: [deletedCartItem] } = await client.query(`
            DELETE FROM cart_items
            WHERE id = $1
            RETURNING *;
        `, [cartItemId]);
        return deletedCartItem;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    createCartItem,
    getAllCartItemsByCartId,
    deleteCartItemById
}