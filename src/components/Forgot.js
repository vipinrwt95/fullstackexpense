import React,{useState,useRef} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
const baseUrl="http://localhost:3001"

export const Forgot=(props)=>{
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const email=useRef();
  
function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
const emailHandler=async (event)=>{
    event.preventDefault();
    let details={
        email:email.current.value,
    }
    axios.post(`${baseUrl}/password/forgot`,details)
    }

return(
    <>
    
   <form  onSubmit={emailHandler} style={{display:'flex',alignContent:'center'}}>
     <input className="text" type="email" placeholder="Email" ref={email}  required/><br/>
    <button className="btn">Reset</button>
   </form>
    
    </>

)
}
