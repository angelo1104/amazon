import React from 'react';
import './App.css';
import Header from "./Containers/Header/Header";
import Home from "./Containers/Home/Home";
import Checkout from "./Containers/Checkout/Checkout";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";


function App() {
  return (

      <Router>
          <div className="App">
                <Switch>
                    <Route path="/checkout">
                        <Header/>
                        <Checkout/>
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
