import { Box, Container, Paper, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import FormField from '../components/FormField';
import SubmitButton from '../components/SubmitButton';
import { useAppDispatch } from '../../../hooks/hooks';
import type { RegisterDto } from '../models/models';
import { registerUser } from '../state/authSlice';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { ToastNotification } from '../components/ToastNotification';
import {
  BoxStyles,
  ContainerStyles,
  PaperStyles,
} from '../styles/signUpStyles';

const SignUpPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterDto>();
  const dispatch = useAppDispatch();
  const [toastOpen, setToastOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegisterSubmit = async (data: RegisterDto) => {
    try {
      setLoading(true);
      const response = await dispatch(registerUser(data));
      console.log(response);
      if (response.meta.requestStatus === 'fulfilled') {
        reset();
        setToastOpen(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container sx={{ ...ContainerStyles }}>
      <Paper elevation={3} sx={{ ...PaperStyles }}>
        <Box
          sx={{ ...BoxStyles }}
          component='form'
          onSubmit={handleSubmit(handleRegisterSubmit)}
        >
          <Typography variant='h4' fontWeight={700} mb={1}>
            Create your account
          </Typography>
          <Typography variant='body1' color='text.secondary' mb={4}>
            Join us and start journey today
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
            name='email'
            control={control}
            label='Email'
            type='email'
            rules={{ required: 'email is required' }}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <FormField
            name='password'
            control={control}
            autoComplete='off'
            label='Password'
            type='password'
            rules={{ required: 'Password is required' }}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <SubmitButton text='Sign Up' loading={loading} />
          <Typography variant='body2' sx={{ mt: 3 }}>
            Already have an account? <NavLink to='/'>Sign In</NavLink>
          </Typography>
        </Box>
        <ToastNotification
          open={toastOpen}
          autoHideDuration={6000}
          onClose={() => setToastOpen(false)}
          message='Registration successful! Please check your email.'
        />
      </Paper>
    </Container>
  );
};

export default SignUpPage;
