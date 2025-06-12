import { Container, Box, Typography, Paper } from '@mui/material';
import Fotka from '../../../assets/avion.png';
import FormField from '../components/FormField';
import SubmitButton from '../components/SubmitButton';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../hooks/hooks';
import type { LoginDto } from '../models/models';
import { loginUser } from '../state/authSlice';
import { NavLink, useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm<LoginDto>();
  const navigate = useNavigate();

  const handleLoginSubmit = async (data: LoginDto) => {
    try {
      const response = await dispatch(loginUser(data));
      console.log(response);
      navigate('/home');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        p: 0,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          minHeight: 500,
          borderRadius: 4,
          overflow: 'hidden',
          width: '900px',
        }}
      >
        {/* Leva strana: Forma */}
        <Box
          sx={{
            flex: '1 1 50%',
            px: 5,
            py: 4,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
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

          <SubmitButton text='Login' type='submit' />

          <Typography variant='body2' sx={{ mt: 3 }}>
            Don’t have an account? <NavLink to='/signup'>Sign Up</NavLink>
          </Typography>
        </Box>

        {/* Desna strana: Slika */}
        <Box
          sx={{
            flex: '1 1 50%',
            boxSizing: 'border-box',
            backgroundImage: `url(${Fotka})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            flexShrink: 0,
          }}
        />
      </Paper>
    </Container>
  );
};

export default SignInPage;
