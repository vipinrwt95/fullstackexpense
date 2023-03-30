import React,{useState,useRef} from "react";
import axios from "axios";
const baseUrl="http://localhost:3001"

export const Login=(props)=>{

  const email=useRef();
const password=useRef();

  const loginHandler=(event)=>{
    event.preventDefault();
    
 let details={
    email:email.current.value,
    password:password.current.value
}
axios.post(`${baseUrl}/login`,details)
.then((res)=>{alert(res.data.message)})
  }

const navHandler=()=>{
props.page(props.item);
}

return(
    <>
   <form className="right-side" onSubmit={loginHandler} style={{display:'flex',alignContent:'center'}}>
     <input className="text" type="email" placeholder="Email" ref={email} />
     <input className="text"type="password" placeholder="Password" ref={password} />
     <button className="btn">Log In</button>
     <nav style={{fontWeight:'25',color:'white'}} onClick={navHandler}>New User,take me to Signup</nav>
     
    </form>
    </>

)
}
