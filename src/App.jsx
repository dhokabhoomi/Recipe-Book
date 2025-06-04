import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AddRecipe from "./components/AddRecipe";
import Search from "./components/Search";

export default function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRecipeAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <Router>
      <div className="app">
        <header className="header">
          <Navbar />
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home key={refreshTrigger} />} />
            <Route
              path="/AddRecipe"
              element={<AddRecipe onRecipeAdded={handleRecipeAdded} />}
            />
            <Route path="/Search" element={<Search />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>© 2025 RecipeRipple. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}
