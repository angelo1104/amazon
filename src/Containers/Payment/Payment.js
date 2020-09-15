import React,{useState} from "react";
import "./Payment.css"
import {useStateValue} from "../../StateProvider";
import BasketProduct from "../Checkout/BasketProduct/BasketProduct";
import {Link} from "react-router-dom";
import {CardElement,useStripe,useElements} from "@stripe/react-stripe-js"
import CurrencyFormat from "react-currency-format";

function Payment() {

     const [error,setError] = useState(null)
    const [disabled,setDisabled] = useState(true)

    const stripe = useStripe()
    const element = useElements()

    //eslint-disable-next-line
    const [{basket, user}, dispatch] = useStateValue()

    const handleSubmit = e=>{

    }


    const handleChange = e =>{
            
        setDisabled(e.empty)
        setError(e.error ? e.error.message : "")
    }


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
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />

                            <div className="price-container">
                                <CurrencyFormat
                                        renderText={(value) => (
                                            <h3>Order Total: {value}</h3>
                                        )}
                                        decimalScale={2}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"$"}
                                    />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment