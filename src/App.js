import React, {useEffect} from 'react';
import './App.css';
import Header from "./Containers/Header/Header";
import Home from "./Containers/Home/Home";
import Checkout from "./Containers/Checkout/Checkout";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Login from "./Containers/Login/Login";
import {auth} from "./firebase";
import {useStateValue} from "./StateProvider";
import Payment from "./Containers/Payment/Payment";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js"

const promise = loadStripe("pk_test_51HRUplG7mYQXcjRQLgPD5Y9RtRiNYSqgfEEy8KezalgBXUNRMfpqnja5Ht0GHgOHpiZo5dobSXRuDMuGiZsU4fYf00iPpQBrTM")

function App() {
  //eslint-disable-next-line
  const [state,dispatch]= useStateValue()

  useEffect(()=>{
      //will only run once when the component loads
      auth.onAuthStateChanged(authUser=>{
          console.log('THIS IS USER>>>',authUser)

          if (authUser){
              //if signed in
              dispatch({
                  type:'SET_USER',
                  user: authUser
              })

          }else{
              //if logged out

              dispatch({
                  type:'SET_USER',
                  user: null
              })
          }
      })
      // eslint-disable-next-line
  },[])

  return (
      <Router>
          <div className="App">
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>


                    <Route path="/checkout">
                        <Header/>
                        <Checkout/>
                    </Route>

                    <Route path="/payment">
                        <Header/>
                        <Elements stripe={promise}>
                            <Payment/>
                        </Elements>
                    </Route>

                    <Route path="/">
                        <Header/>
                        <Home/>
                    </Route>
                </Switch>
          </div>
      </Router>
  );
}

export default App;
