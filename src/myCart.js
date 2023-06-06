//Shows the customer's shopping cart & order total
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import './css/cart.css';

const MyCart = () => {
  const [ cartItems, setCartItems ] = useState([]);
  const [ checkout, setCheckout ] = useState(false);


  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await axios.get('/api/cart/',
        {
          headers: {
          'Authorization': `Bearer ${window.localStorage.getItem('stoken')}`
          }  
        });
        setCartItems(response.data);
        console.log(response);
      }catch (error) {
        console.log(error);
      }
    }
    getCart();
  }, [])

  const handleClick = (e) => {
    e.preventDefault();
    const itemId = e.target.id ;

    deleteItem(itemId);
  }

  const deleteItem = async(id) => {
    try {
      const response = await axios.delete(`api/cart/${id}`);
      console.log(response);
      window.location.reload();
      return(response.data);
    }catch(error) {
      console.log(error);
    }
  }
  
  return(
    <div id='cartbox'>
    <h1 id="carthead" >Cart</h1>
      {
        checkout ?
        cartItems.map((cartItem, index) => {
          const productRoute = '/' + cartItem.productId;
          const id = cartItem.id;
          return(
            <div className='item' key={index}>
              <img className='cartpic' src={cartItem.imageURL} />
              <div className="middiv">
                <Link to={productRoute} className="name">{cartItem.name}</Link>
                <h3 className="price">${cartItem.price}</h3>
              </div>
              <div className="buttdiv">
                <button id={id}onClick={handleClick} className="butts">Remove</button>
              </div>
            </div>
          )
        }) :
        <h1 id="checkout">Thank you for your business!!</h1>
      }
      {
        checkout ?
        <button className="checkbutt" onClick={() => {setCheckout(true)}}>Checkout</button>
        : null
      }
    </div>
  )
}

export default MyCart;