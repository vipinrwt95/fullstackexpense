import React,{useState,useRef} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
const baseUrl="http://localhost:3001"

export const Login=(props)=>{
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const email=useRef();
const password=useRef();
function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
const loginHandler=async (event)=>{
    event.preventDefault();
 
   
      let details={
        email:email.current.value,
        password:password.current.value
    }
    axios.post(`${baseUrl}/login`,details).then(res=>{
      let token=res.data.token
      let payload= parseJwt(token);
      console.log("payload:- ", payload);
      const data={idToken:token,isPremium:payload.isPremium};
      dispatch(authActions.login(data))
      localStorage.setItem('token',token);
      navigate('/expense')
      })
    .catch(err=>{console.log(err.response.data.message)})
      
    }

const navHandler=()=>{
props.page(props.item);
}
const forgotHandler=()=>{
  props.page(3);
}

return(
    <>
    
   <form  onSubmit={loginHandler} style={{display:'flex',alignContent:'center'}}>
     <input className="text" type="email" placeholder="Email" ref={email}  required/><br/>
     <input className="text"type="password" placeholder="Password" ref={password} required/><br/>
     <button className="btn">Log In</button>
     <nav style={{fontWeight:'25',color:'white'}} onClick={navHandler}>New User,take me to Signup</nav>
     
    </form>
    <nav style={{fontWeight:'25',color:'white'}} onClick={forgotHandler}>Forgot Password?</nav>
    </>

)
}
