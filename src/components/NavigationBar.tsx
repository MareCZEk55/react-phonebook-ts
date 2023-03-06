import React, { useState } from "react";
import { AppBar, Toolbar, Typography, makeStyles, Button } from "@mui/material";
import { Link } from "react-router-dom";
import LoginPopup from "./LoginPopup";

const linkStyle = {
  color: "inherit",
  textDecoration: "none",
  marginRight: 20,
};

const NavigationBar: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

const handleLogin = (logged: boolean) => {
        setIsLoggedIn(logged);
        handleCloseDialog();
    };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Telefonní kontakty</Typography>
        <div style={{ marginLeft: "auto" }}>
          <Link to="/" style={linkStyle}>
            Telefony
          </Link>
          <Link to="/zkracenky" style={linkStyle}>
            Zkrácenky
          </Link>
          {isLoggedIn ? (
            <Link to="volnelinky" style={linkStyle}>
              Volné linky
            </Link>
          ) : (
            <Button variant="contained" onClick={handleOpenDialog}>
              Přihlásit
            </Button>
          )}
        </div>
        <LoginPopup open={isDialogOpen} onClose={handleCloseDialog} onLogin={handleLogin} />
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
