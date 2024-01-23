import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Car from './Car';
import Nav from './Nav';
import Reports from './Reports';
import Customer from './Customer';
import Dashboard from './Dashboard';
import { Container, Navbar,Toggle } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faHome, faCar, faChartBar, faUsers, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Login from './Login';


function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [count, setCount] = useState(12);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
    setCount(isSidebarOpen ? 12 : 10);
  };
  
  return (
    <div className='container-fluid bg-secondary min-vh-100 '>
      <div className='row'>
        { isSidebarOpen &&(     
          <div className='col-2 mg-100 bg-dark vh-100%'>
            <Sidebar />
          </div>
        )}
        
        <div className={`col-${count}`}>
          <Nav></Nav>
          <Navbar.Toggle onClick={toggleSidebar} >
              <FontAwesomeIcon className='white' icon={isSidebarOpen ? faTimes : faBars} />
          </Navbar.Toggle>
            
          {}
          <Routes>
            <Route path='/admin' element={<Login/>}> </Route>
            <Route path="/adminhome" element={<Dashboard />}></Route>
            <Route path="/cars" element={<Car />}></Route>
            <Route path='/reports' element={<Reports></Reports>}></Route>
            <Route path='/customers' element={<Customer></Customer>}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
