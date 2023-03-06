import React from "react";
import "./App.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ShortsNumberPage } from "./pages/ShortsNumberPage";
import ContactsPage from "./pages/ContactsPage";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <div className="App">
      <Router basename="phonebook">
        <div>
          <NavigationBar/>

          <Routes>
            <Route path="/" element={<ContactsPage />} />
            <Route path="/zkracenky" element={<ShortsNumberPage />} />
            
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
