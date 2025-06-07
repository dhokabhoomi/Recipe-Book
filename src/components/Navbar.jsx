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
        {/* <div className="nav-container"> */}
        <div className="logo">RecipeRipple</div>
        <div className="nav-right">
          <NavLink
            to="/Search"
            // className={({ isActive }) =>
            //   `search-link ${isActive ? "active-link" : ""}`
            // }
            className="search-link"
            onClick={closeMenu}
          >
            <i className="bi bi-search"></i>
          </NavLink>

          <button
            className="hamburger"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            {isOpen ? (
              <i className="bi bi-x"></i>
            ) : (
              <i className="bi bi-list"></i>
            )}
          </button>

          <div className={`nav-links ${isOpen ? "open" : ""}`}>
            <NavLink
              to="/"
              end
              onClick={closeMenu}
              // className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Home
            </NavLink>
            <NavLink
              to="/AddRecipe"
              onClick={closeMenu}
              // className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Add Recipe
            </NavLink>
          </div>
        </div>
      </div>
      {/* </div> */}
    </nav>
  );
}

export default Navbar;
