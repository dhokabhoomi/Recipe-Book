import { NavLink } from "react-router-dom";

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
          Search
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
