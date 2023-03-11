import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ShortsNumberPage } from "./pages/ShortsNumberPage";
import ContactsPage from "./pages/ContactsPage";
import NavigationBar from "./components/NavigationBar";
import { FreeLinesPage } from "./pages/FreeLinesPage";
import { ThemeProvider } from "@emotion/react";
import { lightTheme, darkTheme } from "./ThemeApp";
import { CssBaseline } from "@mui/material";

function App() {
  const [themeMode, setThemeMode] = useState(darkTheme);

  function toggleTheme() {
    setThemeMode(themeMode === lightTheme ? darkTheme : lightTheme);
  }

  const handleToggleTheme = () => {
    if(themeMode === lightTheme) {
      localStorage.setItem("theme", "dark");
    }else{
      localStorage.setItem("theme", "light");
    }
    toggleTheme();
  };


  useEffect(() => {
    const existingThemePref = localStorage.getItem("theme");
    if(existingThemePref){
      (existingThemePref === "light") ? setThemeMode(lightTheme) : setThemeMode(darkTheme);
    }else{
      setThemeMode(darkTheme);
      localStorage.setItem("theme", "dark");
    }
  }, [])

  return (
    <ThemeProvider theme={themeMode}>
      <CssBaseline />
      <div className="App">
        <Router basename="phonebook">
          <div>
            <NavigationBar toggleTheme={handleToggleTheme} />

            <Routes>
              <Route path="/" element={<ContactsPage />} />
              <Route path="/zkracenky" element={<ShortsNumberPage />} />
              <Route path="/volnelinky" element={<FreeLinesPage />} />
            </Routes>
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
