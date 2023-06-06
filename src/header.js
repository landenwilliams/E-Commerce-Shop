import React, { useState } from "react";
// import './css/header.css';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faMountain } from '@fortawesome/free-solid-svg-icons';



const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(window.localStorage.getItem('stoken'));

  const logOut = (e) => {
    localStorage.removeItem('stoken');
    localStorage.removeItem('userId');
    window.location.replace('/');
  }

  return (
  <React.Fragment>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><hr class="dropdown-divider"/></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled">Disabled</a>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
{/* 
    <div id="headclan">

      <Link to='/shop' className="iconCon"> <FontAwesomeIcon className='icon' icon={faBagShopping} /></Link>
      {
        !isLoggedIn ?
          <Link className='log' to='/login'>Sign In</Link>
          : <button className='log' onClick={logOut}>Logout</button>}
      <Link id='title' to='/'><h1>StoneCaps</h1></Link>
      <Link to='/cart' className="iconCon">< FontAwesomeIcon className='icon' icon={faCartShopping} /></Link>
      <a href='https://www.petrock.com' className="iconCon"> <FontAwesomeIcon className='icon' icon={faMountain} /></a>

    </div> */}
  </React.Fragment>
  )
}

export default Header;