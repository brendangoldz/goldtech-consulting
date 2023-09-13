import React from 'react';
import './Navbar.css'; // Assuming you moved the navbar-related styles into a separate CSS file.
const scrollTo = (id) => {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
};
const Navbar = () => {
  return (
    <div className="navbar">
      <h1 className="brand"><span id="gold">Gold</span>Tech Consulting</h1>
      <ul>
        <li><button onClick={() => scrollTo("home")}>Home</button></li>
        <li><button onClick={() => scrollTo("about")}>About</button></li>
        <li><button onClick={() => scrollTo("services")}>Services</button></li>
        <li><button onClick={() => scrollTo("contact")}>Contact</button></li>
      </ul>
    </div>
  );
};

export default Navbar;
