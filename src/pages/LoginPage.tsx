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
import { User } from '../types';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [formData, setFormData] = useState<FormData>({
    email: 'user@mail.com',
    password: '1324',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [notify, setNotify] = useState<string | null>(null);
  console.log('🚀 ~ LoginPage ~ notify:', notify);
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formData;

    const storedData = localStorage.getItem('db_app');
    const db = JSON.parse(storedData as string);

    const user = db.users.find((user: User) => {
      return user.email === email;
    });
    console.log('🚀 ~ handleSubmit ~ user:', user);
    if (!user) {
      db.users.push({
        id: Date.now().toString(),
        email,
        password,
      });
      localStorage.setItem('db_app', JSON.stringify(db));

      setNotify('User created successfully');
      setFormData({
        email: '',
        password: '',
      });

      login();

      navigate('/');
      return;
    }

    if (user.password !== password) {
      setNotify('Wrong password');

      return;
    }

    login();
    navigate('/');
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
