import React,{useEffect, useRef,useState} from "react";
import axios from "axios";
import expensepic from "./expense.png"
import descpic from "./description.png"
import categorypic from "./category.png"
import useRazorpay from "react-razorpay";

const baseUrl="http://localhost:3001"

const Expense=()=>{
   const Razorpay=useRazorpay();
   const expense=useRef();
   const description=useRef();
   const category=useRef(); 
   const [currentExpense,setExpense]=useState(null);
   const [allExpenses,setallExpenses]=useState(null)
   let content;
   

const ExpenseHandler=(event)=>{
 event.preventDefault();   
 let e=expense.current.value;
 let d=description.current.value;
 let c=category.current.value;
 const token=localStorage.getItem('token')
 axios.post(`${baseUrl}/addExpense`,{expense:e,description:d,category:c},{headers:{"Authorization":token}})
 .then(res=>{
    console.log(res.data);
    let newex=res.data
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
    axios.get(`${baseUrl}/Expenses`,{headers:{"Authorization":token}}).then(res=>{
        setallExpenses(res.data)
      })
   },[currentExpense]);


if(allExpenses)
{ console.log(allExpenses)
  content=<ul>{allExpenses.map(item=>{return <li key={item.id}>{item.expense} {item.description} {item.category} <button className="btndel" onClick={expenseDeleteHandler.bind(null,item.id)}>DELETE</button></li>})}</ul> 
}
async function expenseDeleteHandler(id){
   const token=localStorage.getItem('token')
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
const token=localStorage.getItem('token');
const response=await axios.get(`${baseUrl}/purchase/premium`,{headers:{'Authorization':token}})
var options={
   "key":response.data.key_id,
   "order_id":response.data.order.id,
   "handler":async function(response){
     
  await axios.post(`${baseUrl}/purchase/updatetransactions`,{status:true,order_id:options.order_id,payment_id:response.razorpay_payment_id},{headers:{'Authorization':token}})
         alert('You are a Premium User Now')
      
   },
};
const rzp1=new Razorpay(options);
rzp1.on('payment.failed',async function(error){
   console.log(error)
   await axios.post(`${baseUrl}/purchase/updatetransactions`,{status:false,order_id:options.order_id},{headers:{'Authorization':token}})
   alert('Payment failed'); 
  
})
rzp1.open()
 

}
return (
    <>
     <div><button className="prembutton" onClick={premiumHandler} style={{backgroundColor:'yellow',color:'black'}}>Premium</button></div>    
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
        </div>
   </div>
   
   </>
)




}

export default Expense