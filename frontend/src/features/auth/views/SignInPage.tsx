import { Container, Box, Typography, Paper } from '@mui/material';
import FormField from '../components/FormField';
import SubmitButton from '../components/SubmitButton';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../hooks/hooks';
import type { LoginDto } from '../models/models';
import { loginUser } from '../state/authSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  BoxStyles,
  ContainerStyles,
  ImageContainerStyles,
  PaperStyles,
} from '../styles/signInStyles';
import { useState } from 'react';

const SignInPage = () => {
  const [serverError, setServerError] = useState<string>('');
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>();
  const navigate = useNavigate();

  const handleLoginSubmit = async (data: LoginDto) => {
    try {
      setServerError('');
      const response = await dispatch(loginUser(data));

      if (loginUser.fulfilled.match(response)) {
        // Sada pristupamo response.payload.data.token umesto response.payload.token
        if (response.meta.requestStatus === 'fulfilled') {
          navigate('/home');
        } else {
          setServerError('Login failed - please try again');
        }
      } else if (loginUser.rejected.match(response)) {
        setServerError((response.payload as string) || 'Invalid credentials');
      }
    } catch (err) {
      setServerError('An unexpected error occurred');
      console.error('Unexpected error:', err);
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        ...ContainerStyles,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          ...PaperStyles,
        }}
      >
        {/* Lieva strana: Forma */}
        <Box
          sx={{
            ...BoxStyles,
          }}
          component='form'
          onSubmit={handleSubmit(handleLoginSubmit)}
        >
          <Typography variant='h4' fontWeight={700} mb={1}>
            Welcome back
          </Typography>
          <Typography variant='body1' color='text.secondary' mb={4}>
            Please sign in to your account to continue
          </Typography>

          <FormField
            name='username'
            control={control}
            label='Username'
            type='text'
            rules={{ required: 'Username is required' }}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <FormField
            name='password'
            control={control}
            label='Password'
            type='password'
            autoComplete='off'
            rules={{ required: 'Password is required' }}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          {serverError && (
            <Typography color='error' sx={{ mt: 1, mb: 2 }}>
              {serverError}
            </Typography>
          )}

          <SubmitButton text='Login' type='submit' />

          <Typography variant='body2' sx={{ mt: 3 }}>
            Don’t have an account? <NavLink to='/signup'>Sign Up</NavLink>
          </Typography>
        </Box>

        {/* Desna strana: Slika */}
        <Box
          sx={{
            ...ImageContainerStyles,
          }}
        />
      </Paper>
    </Container>
  );
};

export default SignInPage;
