import React, {useEffect, useState} from "react";
import "./Payment.css"
import {useStateValue} from "../../StateProvider";
import BasketProduct from "../Checkout/BasketProduct/BasketProduct";
import {Link, useHistory} from "react-router-dom";
import {CardElement,useStripe,useElements} from "@stripe/react-stripe-js"
import CurrencyFormat from "react-currency-format";
import {getBasketTotal} from "../../reducer";
import instance from "../../axios";

function Payment() {

    const billingDetails = {
        name: "Jane",
        email: "jane@example.com",
        address: {
            city: "california",
            line1: "berry st",
            state: "LA",
            postal_code: "921087"
        }
    };

    const history = useHistory()

    const [succeeded,setSucceeded] = useState(false)
    const [processing,setProcessing] = useState("")
    const [error,setError] = useState(null)
    const [disabled,setDisabled] = useState(true)
    const [clientSecret,setClientSecret] = useState(true)
    const stripe = useStripe()
    const elements = useElements()

    //eslint-disable-next-line
    const [{basket, user}, dispatch] = useStateValue()

    useEffect(()=>{
        const getClientSecret = async ()=>{
            const response = await instance({
                method:"POST",
                //STRIPE ACCEPTS TOTAL IN A CURRENCIES SUB-UNIT
                url:`/payments/create?total=${getBasketTotal(basket) * 100}`
            })

            setClientSecret(response.data.clientSecret)
        }

        getClientSecret()
    },[basket])

    const handleSubmit = async event=>{
        event.preventDefault()
        setProcessing(true)

        // const payload = await stripe.confirmCardPayment(clientSecret,{
        //     payment_method:{
        //         card: elements.getElement(CardElement)
        //     }
        // }).then(({paymentIntent})=>{
        //     console.log(paymentIntent)
        //     setError(null)
        //     setProcessing(false)
        //     setSucceeded(true)
        //
        //     history.replace("/orders")
        // }).catch(err=> console.log(err))

        const cardElement = elements.getElement("card")

        const paymentMethodReq = await stripe.createPaymentMethod({
            type:"card",
            card:cardElement,
            billing_details:billingDetails
        })

        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method:paymentMethodReq.paymentMethod.id
        })

        console.log(payload)
    }


    const handleChange = e =>{
        setDisabled(e.empty)
        setError(e.error ? e.error.message : "")
    }


    console.log("THIS IS SECRET BABY",clientSecret)
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
                                        value={getBasketTotal(basket)}
                                    />

                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p>: "Buy Now"}</span>
                                </button>
                            </div>

                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment