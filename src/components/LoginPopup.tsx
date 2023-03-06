import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Typography } from "@mui/material";
import { DialogActions } from '@mui/material';

type Props = {
  open: boolean;
  onClose: () => void;
  onLogin: (logged: boolean) => void;
};

const LoginPopup: React.FC<Props> = ({ open, onClose, onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setError(false)
  };

  const handleLogin = () => {
    if (password === "password") {
      onLogin(true)
    } else {
      setError(true);
    }
    
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Přihlásit se</DialogTitle>
      <DialogContent onKeyUp={handleKeyPress} style={{ width: 300}}>
        <DialogContentText>Zadejte heslo pro přihlášení:</DialogContentText>
        <TextField autoFocus type="password" value={password} onChange={handlePasswordChange} margin="dense" fullWidth />

        {error && (
          <Typography variant='caption' color="error" style={{ marginTop: "8px" }}>
            Špatné heslo
          </Typography>
        )}

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Zrušit
        </Button>
        <Button onClick={handleLogin} color="primary">
          Přihlásit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginPopup;
