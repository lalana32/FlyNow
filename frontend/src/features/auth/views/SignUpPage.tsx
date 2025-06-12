import { Box, Container, Paper, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import FormField from '../components/FormField';
import SubmitButton from '../components/SubmitButton';
import { useAppDispatch } from '../../../hooks/hooks';
import type { RegisterDto } from '../models/models';
import { registerUser } from '../state/authSlice';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { ToastNotification } from '../components/ToastNotification';

const SignUpPage = () => {
  const { control, handleSubmit } = useForm<RegisterDto>();
  const dispatch = useAppDispatch();
  const [toastOpen, setToastOpen] = useState(false);

  const handleRegisterSubmit = async (data: RegisterDto) => {
    try {
      const response = await dispatch(registerUser(data));
      console.log(response);
      if (response.meta.requestStatus === 'fulfilled') {
        setToastOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container
      sx={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '60%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          p: 5,
          borderRadius: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
          component='form'
          onSubmit={handleSubmit(handleRegisterSubmit)}
        >
          <Typography variant='h4' fontWeight={700} mb={1}>
            Create your account
          </Typography>
          <Typography variant='body1' color='text.secondary' mb={4}>
            Join us and start journey today
          </Typography>
          <Controller
            name='username'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <FormField
                label='Username'
                type='text'
                {...field} // value, onChange, onBlur, name dolaze ovde
              />
            )}
          />
          <Controller
            name='email'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <FormField
                label='Email'
                type='text'
                {...field} // value, onChange, onBlur, name dolaze ovde
              />
            )}
          />
          <Controller
            name='password'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <FormField
                label='Password'
                type='password'
                {...field} // value, onChange, onBlur, name dolaze ovde
              />
            )}
          />
          <SubmitButton variant='contained' text={'Sign Up'} type='submit' />
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
