import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <div className="logo">RecipeRipple</div>
        <div className="nav-right">
          <NavLink to="/Search" className="search-link" onClick={closeMenu}>
            <i className="bi bi-search"></i>
          </NavLink>

          <button
            className="hamburger"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
            aria-controls="navbar-menu"
          >
            {isOpen ? (
              <i className="bi bi-x"></i>
            ) : (
              <i className="bi bi-list"></i>
            )}
          </button>

          <div id="navbar-menu" className={`nav-links ${isOpen ? "open" : ""}`}>
            <NavLink to="/" end onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/AddRecipe" onClick={closeMenu}>
              Add Recipe
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
