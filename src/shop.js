//Displays the shop itself
import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import Axios from "axios";
// import './css/shop.css';

const Shop = () => {
  const [ products, setProducts ] = useState([]);
  const [ isLoggedIn, setIsLoggedIn ] = useState(window.localStorage.getItem('stoken'));

  useEffect(() => {
    const getProducts = async() => {
      try{
        const response = await Axios.get('/api/products/');
        setProducts(response.data);
        console.log(response.data);
      }catch(error) {
        console.log(error);
      }
    }
    getProducts();
  }, [])

  const addToCart = async (event) => {
    event.preventDefault();
    console.log(event.target.id);
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${window.localStorage.getItem('stoken')}`
        }
      }

      const body = {
        product: {
          id: parseInt(event.target.id),
          quantity: 1,
        }
      }
      // console.log(config);
      Axios.post(
        '/api/cart/', 
        body, 
        config
        ).then(console.log)

    }catch(err){
      console.log(err);
    }

  }
  


  return(
    <div id='productbox'>
    <h1 id="shophead" >Shop</h1>
      {
        products.map((product, index) => {
          const productRoute = '/' + product.id;
          return (
            <div id='routine' key={index}>
              <img className='pics' src={product.imageURL} />
              <Link to={productRoute} className='titles'>{product.name}</Link>
              <h4 className="price">Price: {product.price}</h4>
              <button id={product.id} onClick={addToCart} className='addcart'>Add To Cart</button>
            </div>
          )
        })
      }
    </div>
  )
}

export default Shop;