import React from 'react';
import './App.css';
import HomePage from './Components/HomePage/HomePage';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";


function App() {
  let routes = (
    <BrowserRouter>
            <Routes> 
        <Route path="/" element={<HomePage/>}/>
        {/* <Route path="/afterLogin" element={<After/>}/> */}
        </Routes>
    </BrowserRouter>

  )
  return (
    <div>
    
      <main> {routes} </main>
    </div>
  );
}

export default App;
