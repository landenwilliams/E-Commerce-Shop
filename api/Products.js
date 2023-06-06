const express = require('express')
const { getAllProducts, getProductById } = require('../DB/products')

const router = express.Router();


//GET /api/products
router.get('/', async (req,res, next)=> {
    try{
        const products = await getAllProducts();
        res.send(products);
    }catch(error){
        next(error);
    }
})

//GET /api/products/:id
router.get('/:id', async (req, res, next) => {
    const productId = req.params.id;
    try{
        const product = await getProductById(productId);
        res.send(product);
    }catch(err){
        next(err);
    }
})

module.exports = router;