import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">RecipeRipple</div>
      <div className="nav-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/AddRecipe"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Add Recipe
        </NavLink>
        <NavLink
          to="/Search"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <i className="bi bi-search"></i>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
