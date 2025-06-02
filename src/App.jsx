import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AddRecipe from "./components/AddRecipe";
import Search from "./components/Search";

export default function App() {
  return (
    <Router>
      <header className="header">
        <Navbar />
      </header>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AddRecipe" element={<AddRecipe />} />
          <Route path="/Search" element={<Search />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>© 2025 RecipeRipple. All rights reserved.</p>
      </footer>
    </Router>
  );
}
