import React,{useState} from "react";

export const Login=(props)=>{



return(
    <>
   <form className="right-side">
     
     <input className="text" type="email" placeholder="Email" />
     <input className="text"type="password" placeholder="Password" />
     <button className="btn">Log In</button>
     
    </form>
    </>

)
}
