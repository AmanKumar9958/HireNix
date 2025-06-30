import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Optional: for styling

const Navbar = () => {
    return (
        <nav className="navbar">
        <div className="navbar-logo">
            <Link to="/">HireNix</Link>
        </div>
        <ul className="navbar-links">
            <li>
            <Link to="/jobs">Jobs</Link>
            </li>
            <li>
            <Link to="/candidates">Candidates</Link>
            </li>
            <li>
            <Link to="/about">About</Link>
            </li>
            <li>
            <Link to="/login">Login</Link>
            </li>
        </ul>
        </nav>
    );
};

export default Navbar;