import React, { memo, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import GlobalStyles from "./styles/GlobalStyles";

import NavbarComponent from "./components/Navbar";
const Navbar = memo(NavbarComponent);

import Home from "./components/Home";
import HeroHeader from "./components/HeroHeader";

import AddRecipe from "./components/AddRecipe";
import Search from "./components/Search";

export default function App() {
  const [dataChanged, setDataChanged] = useState(false);

  const handleRecipeAdded = () => {
    setDataChanged((prev) => !prev);
  };

  return (
    <Router>
      <GlobalStyles />
      <div className="recipe-app">
        <header className="header">
          <Navbar />
        </header>

        <main className="recipe-app__main">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroHeader />
                  <Home dataChanged={dataChanged} />
                </>
              }
            />
            <Route
              path="/AddRecipe"
              element={<AddRecipe onRecipeAdded={handleRecipeAdded} />}
            />
            <Route path="/Search" element={<Search />} />
          </Routes>
        </main>

        <footer className="recipe-app__footer ">
          <div className="container">
            <p className="recipe-app__footer-text">
              © 2025 RecipeRipple. All rights reserved. Made with Love for food
              lovers
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}
