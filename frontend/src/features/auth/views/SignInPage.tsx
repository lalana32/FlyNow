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

const SignInPage = () => {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>();
  const navigate = useNavigate();

  const handleLoginSubmit = async (data: LoginDto) => {
    try {
      const response = await dispatch(loginUser(data));
      if (response.meta.requestStatus === 'fulfilled') {
        navigate('/home');
      } else {
        console.log('Login failed:', response.payload);
      }
    } catch (err) {
      console.log('Unexpected error:', err);
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
            rules={{ required: 'Password is required' }}
            error={!!errors.password}
            helperText={errors.username?.message}
          />

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
