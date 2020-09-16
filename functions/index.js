const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const stripe = require("stripe")("sk_test_51HRUplG7mYQXcjRQIJ7SK2LNSd18uYfXLYG9IbjwLk0uOw6wT1BAsviUoFeQLYapaGQBsXLG003bInQjMIklF4xi00xhOlGQsA")


//App config
const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors({origin:true}))
//Routes

app.get("/",(req,res)=>{
    res.status(200).send("hello world")
})

app.post('/payments/create',async (req,res)=>{
    const total= req.query.total
    console.log("Payment request received",total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount:total, //subunits in currency
        currency:"usd"
    })

    res.status(201).send({
        clientSecret: paymentIntent.client_secret
    })
})



//Listen command
exports.api = functions.https.onRequest(app)