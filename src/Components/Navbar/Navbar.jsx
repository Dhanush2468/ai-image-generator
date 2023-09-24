import React, { useState } from "react";
import "./Navbar.css"; // Import the CSS file for styling
import logo from "./logo.png";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
    <nav className="navbar">
        <img src={logo} className="logo" alt="" />
      <div className="navbar-container">
       
        <div className={`menu-icon ${isOpen ? "open" : ""}`} onClick={toggleNavbar}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li className="nav-item">
            <a href="/home">Home</a>
          </li>
          <li className="nav-item">
            <a href="/about">About</a>
          </li>
          <li className="nav-item">
            <a href="/services">Services</a>
          </li>
          <li className="nav-item">
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </div>
       
    </nav>
    <div className="header titles">
    AI Image <span> &nbsp;Generator</span>
  </div>
  </div>
  );
};

export default Navbar;
