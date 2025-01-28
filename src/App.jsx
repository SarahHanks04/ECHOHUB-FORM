import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PageNotFound from "./Pages/PageNotFound";
import ThemeToggle from "./Components/Themes/ThemesToggle";

function App() {
  return (
    <Router>
      <div>
        <ThemeToggle />
      </div>

      <Routes>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
