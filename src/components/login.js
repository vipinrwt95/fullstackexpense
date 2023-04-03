import React,{useState,useRef} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const baseUrl="http://localhost:3001"

export const Login=(props)=>{
  const navigate=useNavigate();
  const email=useRef();
const password=useRef();

const loginHandler=async (event)=>{
    event.preventDefault();
 
   
      let details={
        email:email.current.value,
        password:password.current.value
    }
    axios.post(`${baseUrl}/login`,details).then(res=>{
      console.log(res.data.message)
      console.log(res.data.token);
      localStorage.setItem('token',res.data.token)
      navigate('/expense');
    })
    .catch(err=>{console.log(err.response.data.message)})
      
     
     
 
  }

const navHandler=()=>{
props.page(props.item);
}

return(
    <>
   <form  onSubmit={loginHandler} style={{display:'flex',alignContent:'center'}}>
     <input className="text" type="email" placeholder="Email" ref={email}  required/><br/>
     <input className="text"type="password" placeholder="Password" ref={password} required/><br/>
     <button className="btn">Log In</button>
     <nav style={{fontWeight:'25',color:'white'}} onClick={navHandler}>New User,take me to Signup</nav>
     
    </form>
    </>

)
}
