import React,{useState} from "react";

export const Login=(props)=>{

const navHandler=()=>{
props.page(props.item);
}

return(
    <>
   <form className="right-side" style={{display:'flex',alignContent:'center'}}>
     
     <input className="text" type="email" placeholder="Email" />
     <input className="text"type="password" placeholder="Password" />
     <button className="btn">Log In</button>
     <nav style={{fontWeight:'25',color:'white'}} onClick={navHandler}>New User,take me to Signup</nav>
     
    </form>
    </>

)
}
