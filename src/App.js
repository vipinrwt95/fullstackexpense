
import {useState,useEffect} from 'react'
import './App.css';
import Register from './components/Register';
import Expense from './components/Expense';
import {Routes,Route} from "react-router-dom"
import ExpenseReport from './components/ExpenseReport';
import dolla from './components/dolla.jpg'

function App() {
  
  return (
    <div className='app'>
   <Routes>
    
     <Route path="/" element={<Register/>} />
     <Route path="/expense" element={<Expense/>} />
     <Route path="user/expensereport" element={<ExpenseReport />} />
    </Routes>
    </div>
  );
}

export default App;
