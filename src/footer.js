import React from "react";
// import './css/footer.css';
import { Link } from "react-router-dom";

const Footer = () => {
  return(
    <footer>
      <Link to='/contact' id='talktous' className='link'>Contact Us</Link>
      <Link to="https://twitter.com/KidRock" target="_blank" className="flink"><img src="https://img.freepik.com/free-icon/twitter_318-674515.jpg" className="foot"/></Link>
      <Link to="https://www.instagram.com/therock/" target="_blank" className="flink"><img src="https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-instagram-icon-png-image_6315974.png" className="foot"/></Link>
      <Link to="https://www.facebook.com/SylvesterStallone" target="_blank" className="flink"><img src="https://i.pinimg.com/originals/ce/d6/6e/ced66ecfc53814d71f8774789b55cc76.png" className="foot"/></Link>
      <Link to='/careers' id='job' className='link'>Careers</Link>
    </footer>
  )
}

export default Footer;