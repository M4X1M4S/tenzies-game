import React from "react"
import '../App.css'


 
export default function Main(props){
    return(
        <div>
        <div className=" outer-shell">
           <div className=" inner-shell">
           <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            {props.children}
           </div>
        </div>
        
        </div>)
}