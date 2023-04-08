import React,{useEffect, useRef,useState} from "react";
import axios from "axios";
import expensepic from "./expense.png"
import descpic from "./description.png"
import categorypic from "./category.png"
import useRazorpay from "react-razorpay";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";

const baseUrl="http://localhost:3001"
function parseJwt (token) {
   var base64Url = token.split('.')[1];
   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
   var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
   }).join(''));
 
   return JSON.parse(jsonPayload);
 }

const Expense=()=>{
   
   const navigate=useNavigate()
   const dispatch=useDispatch();
  const token=useSelector(state=>state.auth.tokenid);
   const Razorpay=useRazorpay();
   const expense=useRef();
   const description=useRef();
   const category=useRef(); 
   const [currentExpense,setExpense]=useState(null);
   const [allExpenses,setallExpenses]=useState(null)
   let content;
   const [premium,setPremium]=useState(false);
   const [showboard,setBoard]=useState(false);
   const [boardlist,setList]=useState([]);
   

const ExpenseHandler=(event)=>{
 event.preventDefault();   
 let e=expense.current.value;
 let d=description.current.value;
 let c=category.current.value;
 let token=localStorage.getItem('token');
 axios.post(`${baseUrl}/addExpense`,{expense:e,description:d,category:c},{headers:{"Authorization":token}})
 .then(res=>{
    console.log(res.data);
    let newex=res.data.expense
    setExpense(newex)
 })

}
const addtoDom=(item)=>{
     let child=document.createElement('li');
  child.innerText=`${item.expense} on ${item.description} --> ${item.category} `
  document.getElementById('list').appendChild(child);
}
useEffect(() => {

   const token=localStorage.getItem('token')
   let payload= parseJwt(token);
    console.log("payload:- ", payload);
    if(payload.isPremium==true)
    {
      setPremium(true)
    }
    
   
    axios.get(`${baseUrl}/Expenses`,{headers:{"Authorization":token}}).then(res=>{
        setallExpenses(res.data)
      })
   },[currentExpense,premium]);


if(allExpenses)
{ 
  content=<ul>{allExpenses.map(item=>{return <li key={item.id}>{item.expense} {item.description} {item.category} <button className="btndel" onClick={expenseDeleteHandler.bind(null,item.id)}>DELETE</button></li>})}</ul> 
}
async function expenseDeleteHandler(id){
   let token=localStorage.getItem('token');
    await axios.post(`${baseUrl}/Expenses/Delete`,{id:id},{headers:{"Authorization":token}})
    .then(res=>{
       alert(res.data.message);
     
    })
    await axios.get(`${baseUrl}/Expenses`,{headers:{"Authorization":token}}).then(res=>{
        setallExpenses(res.data)
      })
}
const premiumHandler=async(e)=>{
   e.preventDefault();
let token=localStorage.getItem('token');
const response=await axios.get(`${baseUrl}/purchase/premium`,{headers:{'Authorization':token}})
var options={
   "key":response.data.key_id,
   "order_id":response.data.order.id,
   "handler":async function(response){
     
   const res=await axios.post(`${baseUrl}/purchase/updatetransactions`,{status:true,order_id:options.order_id,payment_id:response.razorpay_payment_id},{headers:{'Authorization':token}})
        console.log(res.data.token);
        localStorage.setItem('token',res.data.token);
      
   },
};
const rzp1=new Razorpay(options);
rzp1.on('payment.failed',async function(error){
   console.log(error)
   await axios.post(`${baseUrl}/purchase/updatetransactions`,{status:false,order_id:options.order_id},{headers:{'Authorization':token}})
})
rzp1.open()
setPremium(true);
}
let users;
const leaderBoardHandler=()=>{

 axios.get(`${baseUrl}/leaderboard`).then(res=>{
   
   setList(res.data.leaderboardusers)
   
 })


}
return (
    <>
     {!premium && <div><button className="prembutton" onClick={premiumHandler} style={{backgroundColor:'yellow',borderRadius:'10px',color:'black'}}>Premium</button></div>}
     {premium && <div className="prembutton"><button style={{backgroundColor:'yellow',borderRadius:'10px',color:'black'}}>You are Premium User</button></div>}     
  <div className="expenselist"><h1>All Expenses...</h1>
            {content}
            </div>
            
        <div>
  <form  onSubmit={ExpenseHandler}> 
  <h1 style={{color:'white',position:'relative' ,left:'80px',top:'2px'}}>New Expense</h1>
  <div style={{padding:"20x"}}><img src={expensepic} style={{height:'3rem',width:'3rem'}} /> <input type="number" className="text" placeholder="Enter Expense.." ref={expense} required/></div>
  <div style={{padding:"20x"}}><img src={descpic}  style={{height:'3rem',width:'3rem'}} /> <input type="text" className="text" placeholder="Description.." ref={description} required/></div>
  <div style={{padding:"20px"}}><img src={categorypic}  style={{height:'3rem',width:'3rem'}} /> <select className="text" ref={category} placeholder="Category" required>
 <option value="RENT">RENT</option>  
 <option value="FUEL">FUEL</option> 
 <option value="SHOP">SHOPPING</option> 
 <option value="ENTERTAINMENT">ENTERTAINMENT</option>
</select></div>
<button className="btn" style={{position:'relative' ,top:'40px',left:'150px' ,width:'125px'}} type="submit">ADD EXPENSE</button>
   </form> 
   <div className='currentexpense'>
            <div><h1>Current Expense Added</h1>
            {currentExpense && <li>{currentExpense.expense} paid for {currentExpense.description} - {currentExpense.category}</li>}
            </div>
            <div>{
                   premium &&   <div><button onClick={leaderBoardHandler}>Show LeaderBoard</button>{boardlist.map((item)=><li key={item.name}>{item.name} ------ {item.totalcost}</li>)}</div> 
                 }  </div>
            
            
        </div>
   </div>
   
   </>
)




}

export default Expense