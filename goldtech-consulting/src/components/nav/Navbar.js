import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

import './Navbar.css'
function Navigation({ scrollTo }) {
    return (
        <Navbar expand="lg" className="navbar">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    <Button className="nav-button" onClick={() => scrollTo("about")}>About</Button>
                    <Button className="nav-button" onClick={() => scrollTo("services")}>Services</Button>
                    <Button className="nav-button" onClick={() => scrollTo("contact")}>Contact</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navigation;
