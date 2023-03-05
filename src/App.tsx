import React from "react";
import "./App.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import ContactsPage from "./pages/ContactsPage";

function App() {
  return (
    <div className="App">
      <Router basename="phonebook">
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/phonebook">Kontakty</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/phonebook" element={<ContactsPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
