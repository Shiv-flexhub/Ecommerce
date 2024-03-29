import React, { Fragment, useEffect } from "react";
import "./ProductDetails.css"
import Carousel from "react-material-ui-carousel"
import { useSelector, useDispatch } from "react-redux"
import {clearErrors, getProductDetails} from "../../actions/productActions"
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component"
import ReviewCard from "./ReviewCard"
import Loader from "../layout/Loader/Loader"
import {useAlert} from "react-alert"



const ProductDetails = () =>{

    const { id } = useParams();

    const alert = useAlert();

    const dispatch = useDispatch();
    
    const {product,loading,error} = useSelector(state=>state.productDetails);

    const options ={
        edit:false,
        color:"rgba(20,20,20.0.1)",
        activeColor:"tomato",
        size:window.innerWidth<600?20:25,
        value:product.ratings,
        isHalf:true
    }
    console.log(product.ratings)
    
    useEffect(()=>{

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
 
        dispatch(getProductDetails(id))
    },[dispatch,id,alert,error])
    return(

        <Fragment>
            {loading ? <Loader/> : (
            <Fragment>
                <div className="productDetails">

                    <div>
                        <Carousel className="image">
                            {product.images &&
                            product.images.map((item,i)=>(
                                <img  key={item.url} src={item.url} alt={`${i}slide`} className="carouselImage" />
                            ))}
                        </Carousel>
                    </div>

                    <div>
                        <div className="detailsBlock-1">
                            <h2>{product.name}</h2>
                            <p>Product # {product._id}</p>
                        </div>
                        <div className="detailsBlock-2">
                            <ReactStars {...options} /> 
                            <span className="numberOfReviews">{product.numOfReviews} reviews</span>
                        </div>
                        <div className="detailsBlock-3">
                            <h1>{`₹${product.price}`}</h1>
                            <div className="detailsBlock-3-1">
                                <div className="detailsBlock-3-1-1">
                                    <button>-</button>
                                    <input type="number" value="0" />
                                    <button>+</button>
                                </div>
                                <button>Add to Cart</button>
                            </div>
                            <p>Status:
                                <b className={product.stock<1?"redColor":"greenColor"}>
                                    {product.stock<1?"OutOfStock":"InStock"}
                                </b>
                            </p>
                        </div>

                        <div className="detailsBlock-4">
                            Description: <p>{product.description}</p>
                        </div>  

                        <button className="submitReview">Sumbit Review</button>
                    </div>
                </div>

                <h3 className="reviewsHeading">REVIEWS</h3>
                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews && product.reviews.map(review=>(
                                <ReviewCard review={review}/>
                            ))}
                        </div>
                    ) : (
                        <p className="noReviews">No reviews yet</p>
                    )}
            </Fragment>
            )}
        </Fragment>
    )
}

export default ProductDetails