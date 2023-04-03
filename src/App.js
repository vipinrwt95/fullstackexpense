
import {useState,useEffect} from 'react'
import './App.css';
import Register from './components/Register';
import Expense from './components/Expense';
import {Routes,Route} from "react-router-dom"
import dolla from './components/dolla.jpg'

function App() {
  
  return (
    <div className='app'>
   <Routes>
    
     <Route path="/" element={<Register/>} />
     <Route path="/expense" element={<Expense/>} />
    </Routes>
    </div>
  );
}

export default App;
