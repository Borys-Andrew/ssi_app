import React, { useState } from 'react';
import {
  Container,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
  OutlinedInput,
  FormControl,
  InputLabel,
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform form submission logic here
    console.log(formData);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <Box
      component={'div'}
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="xs">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          borderRadius={2}
          border={1}
          sx={{
            // boxShadow: '5px 5px 5px #d1cfd1',
            borderColor: 'grey.500',
          }}
          padding={5}
        >
          <form onSubmit={handleSubmit}>
            <Typography
              variant="h4"
              component="h1"
              sx={{ mb: 3, textAlign: 'center' }}
            >
              Login
            </Typography>
            <FormControl
              fullWidth
              sx={{ mb: 3 }}
            >
              <InputLabel htmlFor="email">Email</InputLabel>
              <OutlinedInput
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                endAdornment={
                  <InputAdornment position="end">
                    <AlternateEmailIcon sx={{ mr: 1 }} />
                  </InputAdornment>
                }
                label="Email"
              />
            </FormControl>

            <FormControl
              fullWidth
              sx={{ mb: 3 }}
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Login
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
