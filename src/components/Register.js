import React,{useState} from "react";

import { Login } from "./login";
import {Signup} from "./signup";
import dolla from './dolla.jpg';

let Register=()=>{

const [page,setPage]=useState(0);
const pagehandler=(item)=>{
   
   setPage(item)
}

return (<>

<div className="register">
{page==0 && <>
    <h1 className="brand">Expense Tracker</h1>
  <div  onClick={pagehandler.bind(null,1)}><h2 style={{color:'white'}} >If new here,</h2><button className="btn">Signup</button></div>
  <div  onClick={pagehandler.bind(null,2)}><h2 style={{color:'white'}}  >Already a user,</h2><button className="btn">Login</button></div></>}
{page==1 && <><h1 className="brand">Expense Tracker</h1><Signup page={pagehandler} item={2} /></>}
{page==2 && <><h1 className="brand">Expense Tracker</h1><Login page={pagehandler} item={1}/></>}
</div>

</>)
 
}
export default Register;


