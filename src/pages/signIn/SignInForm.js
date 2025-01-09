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
import ForgotPassword from './ForgotPassword';
import { useDispatch } from 'react-redux';
import { adminSignin } from '../../redux/slices/authSlice';

const SignInForm = ({ onLogin = () => {} }) => {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const admin_id = data.get('id');
    const admin_pw = data.get('password');

    let valid = true;
    if (!admin_id) {
      setEmailError('ID is required');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!admin_pw || admin_pw.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      try {
        const result = await dispatch(
          adminSignin({ admin_id, admin_pw })
        ).unwrap();
        localStorage.setItem('token', result.token); // JWT 토큰 저장
        alert('Login successful!');
        onLogin();
      } catch (error) {
        alert(`Login failed: ${error.message}`);
      }
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
        <FormLabel>ID</FormLabel>
        <TextField
          id="id"
          name="id"
          placeholder="ID"
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
