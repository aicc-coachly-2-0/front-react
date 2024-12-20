import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import ForgotPassword from './ForgotPassword'; // 경로 유지

const SignInForm = ({ onLogin }) => {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    let valid = true;
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email address');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      onLogin(email, password);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <FormControl>
        <FormLabel>Email</FormLabel>
        <TextField
          id="email"
          name="email"
          placeholder="Email"
          required
          fullWidth
          error={!!emailError}
          helperText={emailError}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <TextField
          id="password"
          name="password"
          placeholder="Password"
          type="password"
          required
          fullWidth
          error={!!passwordError}
          helperText={passwordError}
        />
      </FormControl>
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <Button onClick={() => setIsForgotPasswordOpen(true)}>
        Forgot Password?
      </Button>
      <ForgotPassword
        open={isForgotPasswordOpen}
        handleClose={() => setIsForgotPasswordOpen(false)}
      />
      <Button type="submit" fullWidth variant="contained">
        Sign In
      </Button>
    </Box>
  );
};

export default SignInForm;
