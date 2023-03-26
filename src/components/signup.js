import axios from "axios";
import React,{useRef} from "react";
const baseUrl="http://localhost:3001/message"

export const Signup=(props)=>{
const name=useRef();
const email=useRef();
const password=useRef();

const signupHandler=(event)=>{
    event.preventDefault();
    
 let details={
    name:name.current.value,
    email:email.current.value,
    password:password.current.value
}
axios.post(`${baseUrl}`,details)
}

return(
    <>
   <form className="right-side" onSubmit={signupHandler}>
     <input  className="text"type="text" placeholder="Name"  ref={name}  required/>
     <input className="text" type="email" placeholder="Email" ref={email} required/>
     <input className="text"type="password" placeholder="Password" ref={password} required />
     <button className="btn" type="submit">Register</button>
     </form>
</>
)

}

