import React, { Fragment, useEffect } from "react";
import "./Home.css"
import {CgMouse} from "react-icons/cg"
import ProductCard from "./ProductCard"  
import MetaData from "../layout/MetaData"
import { clearErrors, getProduct }  from "../../actions/productActions"
import { useSelector, useDispatch} from "react-redux"
import Loader from "../layout/Loader/Loader";
import {useAlert} from "react-alert"

const Home =() =>{

    const alert = useAlert()

    const dispatch = useDispatch();
    const {loading, error, products, productsCount} = useSelector(state=>state.products)

    useEffect(()=>{

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
 
        dispatch(getProduct())
    },[dispatch,error,alert])
    return(
        <Fragment>

            <MetaData title={"Home Page"}/>
                <div className="banner">
                    <p>Welcome to Ecommerce</p>
                    <h1>Find Amazing products below!!</h1>


                    <a href="#container">
                        <button>
                            Scroll<CgMouse/> 
                        </button>
                    </a>
                </div>

            {loading ? <Loader/> : 
            
            <Fragment>

                <h2 className="homeHeading">Featured Products</h2>

                <div className="container" id="container">
                    {products && products.map(product=>(
                        <ProductCard product={product}/>
                    ))}
                </div>
            </Fragment>}
        </Fragment>
    )
}

export default Home;