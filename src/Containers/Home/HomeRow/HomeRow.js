import React from "react";
import "./HomeRow.css";

function HomeRow(props){
    return(
        <div className="home-row" >
            {props.children}
        </div>
    )
}

export default HomeRow;