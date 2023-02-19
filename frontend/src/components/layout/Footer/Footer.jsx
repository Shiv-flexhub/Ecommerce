import React from "react"
import playstore from "../../../images/playstore.png"
import appstore from "../../../images/Appstore.png"
import "./Footer.css"
import {FaTwitter, FaInstagram, FaLinkedin} from 'react-icons/fa'

const Footer = () =>{

    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Andriod and IOS mobile phones </p>
                <img src={playstore} alt="playstore" />
                <img src={appstore} alt="appstore" />
            </div>

            <div className="midFooter">
                <h1>E-COMMERCE</h1>
                <p>High quality is our first priority</p>

            </div>
            <div className="rightFooter">
                <h4>Follow me on:-</h4>
                <a href="https://www.instagram.com/_shiva_0701/"><FaInstagram/> Instagram</a>
                <a href="https://twitter.com/ShivaChaubey07"><FaTwitter/> Twitter</a>
                <a href="https://www.linkedin.com/in/shiva-chaubey-3b0399201/"><FaLinkedin/> Linkedin</a>
            </div>
        </footer>
    )

}

export default Footer;