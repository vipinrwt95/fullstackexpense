
import {useState,useEffect} from 'react'
import './App.css';
import Register from './components/Register';
import Expense from './components/Expense';
import {Routes,Route} from "react-router-dom"

function App() {
  
  return (
   <Routes>
    
     <Route path="/" element={<Register/>} />
     <Route path="/expense" element={<Expense/>} />
    </Routes>
  );
}

export default App;
