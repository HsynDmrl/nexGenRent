import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

function Nav({ Toggle }) {
  return (
    <Navbar expand="sm" bg="transparent" variant="dark">
      {/* Replace the Navbar.Brand with Navbar.Toggle */}
      <Navbar.Toggle onClick={Toggle} />
      {/* Rest of your Navbar components */}
      <Navbar.Collapse id="collapsibleNavId">
        <NavDropdown title="Hüseyin" id="dropdownId">
          <NavDropdown.Item href="#">Profile</NavDropdown.Item>
          <NavDropdown.Item href="#">Setting</NavDropdown.Item>
          <NavDropdown.Item href="#">Logout</NavDropdown.Item>
        </NavDropdown>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Nav;
