import React from "react";
import "./Product.css";

function Product(props) {
    return (
        <div className="product">
            <div className="product-info">
                <div className="product-text">
                    <p className="text-of-product">{props.text}</p>
                    <p className="product-price">
                        <small>$</small>
                        <strong>{props.price}</strong>
                    </p>
                    <div className="product-rating">
                        {
                            Array(props.rating)
                                .fill()
                                .map((_, i) => (
                                    <p>
                                        <span role="img" aria-label="rating start emoji">🌟</span>
                                    </p>
                                ))}
                    </div>

                    <div className="product-image">
                        <img src={props.imageUrl} alt=""/>
                    </div>

                    <button>Add to basket</button>
                </div>
            </div>
        </div>
    );
}

export default Product;