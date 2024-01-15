import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faHome, faCar, faChartBar, faUsers, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='bg-dark'>
      <Navbar variant="dark" expand="lg" fixed="sticky" className='mt-4'>
        <Navbar.Toggle onClick={toggleSidebar}>
          <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav" className={isSidebarOpen ? 'show' : ''}>
          <Nav className="flex-column">
            <Navbar.Brand as={Link} to="/adminhome">Logo</Navbar.Brand>
            <Nav.Link as={Link} to="/adminhome"><FontAwesomeIcon icon={faHome} /> Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/cars"><FontAwesomeIcon icon={faCar} /> Cars</Nav.Link>
            <Nav.Link as={Link} to="/reports"><FontAwesomeIcon icon={faChartBar} /> Reports</Nav.Link>
            <Nav.Link as={Link} to="/customers"><FontAwesomeIcon icon={faUsers} /> Customers</Nav.Link>
            <Nav.Link as={Link} to="/logout"><FontAwesomeIcon icon={faSignOutAlt} /> Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Content */}
      <div className={`content ${isSidebarOpen ? 'open' : ''}`}>
        {/* Diğer sayfa içeriği buraya eklenebilir */}
      </div>
    </div>
  );
}

export default Sidebar;

