import React from 'react'
import {ReactNavbar} from 'overlay-navbar'
import {MdAccountCircle } from "react-icons/md";
import {MdSearch } from "react-icons/md";
import {MdAddShoppingCart } from "react-icons/md";
import logo from '../../../images/logo.png'

const Header = () =>{
    return <ReactNavbar 
    burgerColorHover="#eb4034"
    logo={logo}
    logoWidth="17vmax"
    logoHeight="17vmax"
    navColor1="white"
    link1Text="Home"
    link2Text="Product"
    link3Text="Contact"
    link4Text="About"
    link1Url="/"
    link2Url="/contact"
    link3Url="/product"
    link4Url="/about"
    link1Size="1.6vmax"
    link1Color="rgba(35,35,35,0.8)"
    nav1justifyContent="flex-end"
    nav2justifyContent="flex-end"
    nav3justifyContent="flex-start"
    nav4justifyContent="flex-start"
    link1ColorHover="#eb4034"
    profileIconColor="rgba(35,35,35,0.8)"
    searchIconColor="rgba(35,35,35,0.8)"
    cartIconColor="rgba(35,35,35,0.8)"
    profileIconColorHover="#eb4034"
    searchIconColorHover="#eb4034"
    cartIconColorHover="#eb4034"
    link1Margin="2vmax"
    cartIconMargin="1.2vmax"
    profileIcon={true}
    ProfileIconElement= {MdAccountCircle}
    searchIcon={true}
    SearchIconElement={MdSearch}
    cartIcon={true}
    CartIconElement={MdAddShoppingCart}/>
}   

export default Header;