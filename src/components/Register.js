import React,{useState} from "react";

import { Login } from "./login";
import {Signup} from "./signup";

let Register=()=>{

const [page,setPage]=useState(0);
const pagehandler=(item)=>{
   
   setPage(item)
}

return (<>

<div className="login">
<div className="container">

{page==0 && <>
    <h1 className="brand">Expense Tracker</h1>
  <div className="hometext" onClick={pagehandler.bind(null,1)}><h1 >If new here,</h1><button className="btn">Signup</button></div>
  <div className="hometext2" onClick={pagehandler.bind(null,2)}><h1 >Already a user,</h1><button className="btn">Login</button></div></>}
{page==1 && <><h1 className="brand">Expense Tracker</h1><Signup page={pagehandler} item={2} /></>}
{page==2 && <><h1 className="brand">Expense Tracker</h1><Login page={pagehandler} item={1}/></>}
</div>
</div>
</>)
 
}
export default Register;


