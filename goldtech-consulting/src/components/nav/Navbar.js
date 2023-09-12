import React from 'react';
import './Navbar.css'; // Assuming you moved the navbar-related styles into a separate CSS file.
const Navbar = () => {
  return (
    <div className="navbar">
      <h1 className="brand"><span id="gold">Gold</span>Tech Consulting</h1>
      <ul>
        <li><a href="#services">Services</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  );
};

export default Navbar;
