import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  FormHelperText,
} from '@mui/material';
import { VisibilityOff, Visibility, AlternateEmail } from '@mui/icons-material';

import { User } from '../types';
import { AuthContext } from '../context/AuthContext';

type FormDataTypes = {
  email: string;
  password: string;
};

type ErrorsType = {
  email?: string;
  password?: string;
};

const regEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<FormDataTypes>({
    email: 'user@mail.com',
    password: '1324',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<ErrorsType>({});

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!regEmail.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const { email, password } = formData;
    const id = Date.now().toString();
    const newUser: User = {
      id,
      email,
      password,
      favorites: [],
    };

    const storedData = localStorage.getItem('db_app');
    const db = JSON.parse(storedData as string);

    const user = db.users.find((user: User) => {
      return user.email === email;
    });

    if (!user) {
      db.users.push(newUser);
      localStorage.setItem('db_app', JSON.stringify(db));

      setUser({
        userId: id,
        isAuth: true,
      });

      setFormData({
        email: '',
        password: '',
      });

      navigate('/');

      return;
    }

    if (user.password !== password) {
      setErrors((prevState) => ({
        ...prevState,
        password: 'Invalid password',
      }));

      return;
    }

    setUser({
      userId: id,
      isAuth: true,
    });

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
              <InputLabel
                htmlFor="email"
                error={!!errors.email}
              >
                Email
              </InputLabel>
              <OutlinedInput
                error={!!errors.email}
                id="email"
                name="email"
                type="text"
                value={formData.email}
                onChange={handleInputChange}
                endAdornment={
                  <InputAdornment position="end">
                    <AlternateEmail sx={{ mr: 1 }} />
                  </InputAdornment>
                }
                label="Email"
              />
              {!!errors.email && (
                <FormHelperText
                  error
                  id="component-error-text"
                >
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              sx={{ mb: 3 }}
            >
              <InputLabel
                htmlFor="password"
                error={!!errors.password}
              >
                Password
              </InputLabel>
              <OutlinedInput
                error={!!errors.password}
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
              {!!errors.password && (
                <FormHelperText
                  error
                  id="component-error-text"
                >
                  {errors.password}
                </FormHelperText>
              )}
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
