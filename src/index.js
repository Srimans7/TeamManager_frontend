import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Team from './team.js';
import Project from './projects.js';
import Employee from './employee.js';
import Nav from './nav.js'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom'


const myStyle = {
    backgroundColor:
        "#D3D3D3",
    
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<div style={myStyle}><BrowserRouter>

	<div style={{display: 'flex' }} >
    <Nav  />

    <Routes>
        <Route exact path='/' exact element={<Team />} />
        <Route path='/projects' element={<Project />} />
        <Route  path='/employees'  element={<Employee />} />
    </Routes>
    </div>
</BrowserRouter></div>
  
);

