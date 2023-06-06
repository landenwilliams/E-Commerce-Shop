// Home | About Us Page
import React, { useState } from "react";
// import './css/home.css';

const Home = () => {

  return(
    <>
      <div id='homediv' className="bg-container">
        <div id="foundersquote" className="bg-text">
          <p id='quote'>"It's a hard ROCK life" - </p>
          <p>Co-Founders Dwayne "The Rock" Johnson & Rocky Balboa</p>
        </div>
        <div className='twobox'>
          <div>
            <h3 id='found'>Founder's Story</h3>
            <p id='story' className="blurbs">We made it out the mud together, living the hard life since 
            we were pebbles. Love all our rocks and want them to shine, fresh out the mud & never returning. Spreading
            love & positivity to all.</p>
          </div>
          <div>
            <h3 id='mission'>Mission Statement</h3>
            <p id='statement' className='blurbs'>We stay committed to keeping everyone thriving & shining.
          Despite the hardships we endured as pebbles, we fought through. We want to pass that same hope & confidence forward.
          Stay shining & dripping</p>
          </div>
        </div>
        <div id='remaining'>
        </div>
      </div>
    </>
  )
}

export default Home;