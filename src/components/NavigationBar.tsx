import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { Link } from "react-router-dom";
import LoginPopup from "./LoginPopup";

const linkStyle = {
  color: "inherit",
  textDecoration: "none",
  marginRight: 20,
};

type Props = {
  toggleTheme: () => void;
};

const NavigationBar: React.FC<Props> = ({ toggleTheme }) => {
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
            <Link to="/volnelinky" style={linkStyle}>
              Volné linky
            </Link>
          ) : (
            <Button variant="contained" onClick={handleOpenDialog}>
              Přihlásit
            </Button>
          )}
          <IconButton onClick={toggleTheme}>
            <Brightness4Icon />
          </IconButton>
        </div>
        <LoginPopup
          open={isDialogOpen}
          onClose={handleCloseDialog}
          onLogin={handleLogin}
        />
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
