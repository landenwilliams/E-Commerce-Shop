const {client} = require("./index.js");

const createProduct = async ({
    name,
    description,
    imageURL,
    price
}) => {
    try {
        const { rows: [product] } = await client.query(`
            INSERT INTO products(name, description, "imageURL", price)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (name) DO NOTHING
            RETURNING *;
        `, [name, description, imageURL, price]);
        return product;
    } catch (error) {
        throw error;
    }
}

const getAllProducts = async () => {
    try {
        const { rows: products } = await client.query(`
            SELECT *
            FROM products;
        `);

        return products;
    } catch (error) {
        throw error;
    }
}

const getProductById = async (productId) => {
    try {
        const { rows: [product] } = await client.query(`
            SELECT *
            FROM products
            WHERE id=${productId};
        `);
        return product;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createProduct, 
    getAllProducts,
    getProductById
};