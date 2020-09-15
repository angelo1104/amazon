import React from "react";
import "./Payment.css"
import {useStateValue} from "../../StateProvider";
import BasketProduct from "../Checkout/BasketProduct/BasketProduct";
import {Link} from "react-router-dom";

function Payment() {

    const [{basket, user}, dispatch] = useStateValue()

    return (
        <div className="payment">
            <h1>Checkout(
                {
                    <Link to={"/checkout"}>
                        {basket?.length} items
                    </Link>
                }
                )
                </h1>
            <div className="payment-container">
                {/*Payment Section - delivery address*/}
                <div className="payment-section">
                    <div className="payment-title delivery">
                        <h3>Delivery Address</h3>
                    </div>

                    <div className="payment-address">
                        <p>{user?.email}</p>
                        <p>123 One Infinite Loop</p>
                        <p>Cupertino, CA</p>
                    </div>
                </div>

                {/*Payment Section -review products*/}
                <div className="payment-section">
                    <div className="payment-title">
                        <h3>Review items and delivery.</h3>
                    </div>

                    <div className="payment-items">
                        {/*All products in cart.*/}
                        {
                            basket.map((item, index) => {
                                return (
                                    <BasketProduct
                                        style={{backgroundColor: "white"}}
                                        key={index}
                                        uuid={item.uuid}
                                        id={item.id}
                                        title={item.title}
                                        image={item.image}
                                        rating={item.rating}
                                        price={item.price}/>
                                )
                            })
                        }
                    </div>
                </div>

                {/*Payment Section - payment method*/}
                <div className="payment-section">
                    <div className="payment-title">
                        <h3>Payment Method</h3>
                    </div>

                    <div className="payment-details">
                        {/*Stripe Magic*/}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment