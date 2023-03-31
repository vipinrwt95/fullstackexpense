import React,{useEffect, useRef,useState} from "react";
import axios from "axios";
import expensepic from "./expense.png"
import descpic from "./description.png"
import categorypic from "./category.png"

const baseUrl="http://localhost:3001"

const Expense=()=>{
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
 axios.post(`${baseUrl}/addExpense`,{expense:e,description:d,category:c})
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
    axios.get(`${baseUrl}/Expenses`).then(res=>{
        setallExpenses(res.data)
      })
   },[currentExpense]);


if(allExpenses)
{ console.log(allExpenses)
  content=<ul>{allExpenses.map(item=>{return <li key={item.id}>{item.expense} {item.description} {item.category} <button className="btndel" onClick={expenseDeleteHandler.bind(null,item.id)}>DELETE</button></li>})}</ul> 
}
async function expenseDeleteHandler(id){
    
    await axios.delete(`${baseUrl}/Expenses/Delete`,{data:{id:id}})
    .then(res=>{
       alert(res.data.message);
     
    })
    await axios.get(`${baseUrl}/Expenses`).then(res=>{
        setallExpenses(res.data)
      })
}
return (
    <div>
        
        <div className="container">
        <div className="brand">
            <div className="list" id="list"><h1>All Expenses...</h1>
            {content}
            </div>
        </div>
  <form style={{right:'50px'}} onSubmit={ExpenseHandler}> 
  <h1 style={{color:'white',position:'relative' ,left:'80px',top:'2px'}}>New Expense</h1>
  <div style={{padding:"50px"}}><img src={expensepic} /> <input type="number" className="text" placeholder="Enter Expense.." ref={expense} required/></div>
  <div style={{padding:"50px"}}><img src={descpic}  /> <input type="text" className="text" placeholder="Description.." ref={description} required/></div>
  <div style={{padding:"50px"}}><img src={categorypic}  /> <select className="text" ref={category} placeholder="Category" required>
 <option value="RENT">RENT</option>  
 <option value="FUEL">FUEL</option> 
 <option value="SHOP">SHOPPING</option> 
 <option value="ENTERTAINMENT">ENTERTAINMENT</option>
</select></div>
<button className="btn" style={{position:'relative' ,left:'150px'}} type="submit">ADD EXPENSE</button>
   </form> 
   <div className="brand" style={{position:'fixed',right:'0'}}>
            <div className="list" id="list"><h1>Current Expense Added</h1>
            {currentExpense && <li>{currentExpense.expense} paid for {currentExpense.description} - {currentExpense.category}</li>}
            </div>
        </div>
   </div>
   
   </div>
)




}

export default Expense