//Logs In/Registers the user
import React, { useState } from "react";
import axios from "axios";
// import './css/login.css';

const Login = () => {
  const [ isLoggedIn, setIsLoggedIn ] = useState(window.localStorage.getItem('stoken'));
  const [ showLoginButton, setShowLoginButton ] = useState(true);
  const[ logUser, setLogUser ] = useState('');
  const[ logPass, setLogPass ] = useState('');
  
  const registerUser = async(username, password) => {
    try {
      const response = await axios.post('/api/Users/register',
      {  
        user: {
          username: username,
          password: password,
          isAdmin: false
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
      );
      console.log("DATA", response.data);
     return response.data;
    }catch(error){
     console.log(error);
    }
  }

  const logIn = async(username, password) => {
    try {
     const result = await axios.post('/api/Users/login',
     {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
        username: username,
        password: password
    }
    );
    console.log("response", result.data);
     window.localStorage.setItem('stoken', `${result.data.token}`);
     window.location.replace('/');
    }catch(error){
     console.log(error);
    }
  }


  const logOut =() => {
    localStorage.removeItem('stoken');
    window.location.replace('/');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    console.log("submit");

    if(form[3].name === "register") {
      const passConf = form[2].value;
      if(passConf === logPass) {
        console.log("submit");
        registerUser(logUser, logPass);
      } else {
        console.log("Passwords do not match");
      }
    } else if (form[2].name === 'login') {
      console.log("login")
      logIn(logUser, logPass);
    }
  };

  const onChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    if(name === 'username') {
      setLogUser(value);
    } else if (name === 'password') {
      setLogPass(value);
    }
  }

  return(
    <div id="logpage">
      {
        isLoggedIn ? 
        <>
          <p id="logmessage">Already Logged In!</p>
          <button onClick={logOut} className="logreg">Logout</button>          
        </> :
        <form id="logform" onSubmit={handleSubmit}>
          <input className="userpass" type="text" placeholder="Enter Username" min="5" maxLength="15" name="username" onChange={onChange} required></input>
          <input className="userpass" type="password" placeholder="Enter Password" min="8" maxlength="20" name="password" onChange={onChange} required></input>
          {
            showLoginButton ?
            <>
                <button className="logreg" type="submit" name="login">Login</button>
                <button className="sublog" onClick={() => setShowLoginButton(false)}>Not Registered? Click Here!</button>
            </> :
            <>
              <input className="userpass" type="password" placeholder="Confirm Password" name="Confirm Password"></input>
              <button className="logreg" type="submit" name="register">Register</button>
              <button className="sublog" onClick={() => setShowLoginButton(true)}>Already Registered? Login Here!</button>            
            </>
          }
        </form>
      }
    </div>
  )
}

export default Login;