import React from "react";
import "./Product.css";
import {useStateValue} from "../../../StateProvider";

function Product({id,title,image,rating,price}) {
    //eslint-disable-next-line
    const [{basket},dispatch] = useStateValue();

    const addToBasket = ()=>{
        //dispatch to the data layer
        dispatch({
            type:"ADD_TO_BASKET",
            item:{
                id:id,
                title: title,
                image: image,
                rating: rating,
                price: price
            }
        })
    }

    return (
        <div className="product">
            <div className="product-info">
                <div className="product-text">
                    <p className="text-of-product">{title}</p>
                    <p className="product-price">
                        <small>$</small>
                        <strong>{price}</strong>
                    </p>
                    <div className="product-rating">
                        {
                            Array(rating)
                                .fill()
                                .map((_, i) => (
                                    <p>
                                        <span role="img" aria-label="rating start emoji">🌟</span>
                                    </p>
                                ))}
                    </div>

                    <div className="product-image">
                        <img src={image} alt=""/>
                    </div>

                    <button onClick={addToBasket}>Add to basket</button>
                </div>
            </div>
        </div>
    );
}

export default Product;