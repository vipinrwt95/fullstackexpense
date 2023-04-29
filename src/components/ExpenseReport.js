import React from "react";

const ExpenseReport=()=>{



    return (<>
    
    <table style={{width:"100%",position:"fixed",top:"75px"}}>
    <h1 style={{color:"yellow",position:"fixed",top:"5px"}}>Month</h1>
  <tr>
    <th>Date</th>
    <th>Description</th> 
    <th>Category</th>
    <th>Income</th> 
    <th>Expense</th>
</tr>
 
</table>
<table style={{width:"75%",position:"relative",top:"75px"}}>
    <h1 style={{color:"yellow",top:"5px"}}>Yearly</h1>
  <tr>
    <th>Month</th>
    <th>Income</th> 
    <th>Expenditure</th>
    <th>Savings</th> 
    
</tr>
 
</table>

<table style={{width:"50%",position:"absolute",bottom:"0px"}}>
    <h1 style={{color:"yellow",top:"5px"}}>Notes Report</h1>
  <tr>
    <th>Date</th>
    <th>Notes</th> 
</tr>

 
</table>
    
    </>)
}
export default ExpenseReport