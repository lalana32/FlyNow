import Box from '@mui/material/Box';
import { Button, Container, Typography } from '@mui/material';
import SignInForm from '../forms/SignInForm';
import Fotka from '../../../assets/fotka.jpg';
import { useState } from 'react';
import SignUpForm from '../forms/SignUpForm';

const AuthPage = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  return (
    <Container sx={{ display: 'flex', minHeight: '100vh', gap: 10 }}>
      {/* Left: SignInForm */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant='h3'
          sx={{ fontFamily: 'Poppins', fontWeight: 500 }}
        >
          Travel Voyanix
        </Typography>
        <Typography variant='body1'>Explore more. Expirience life</Typography>
        <Box
          sx={{
            width: 400,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            mt: 5,
          }}
        >
          {/* Dugmad zajedno sa formom */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant={mode === 'signin' ? 'contained' : 'outlined'}
              onClick={() => setMode('signin')}
              sx={{
                backgroundColor: mode === 'signin' ? 'black' : 'white',
                color: mode === 'signin' ? 'white' : 'black',
                width: 180,
              }}
            >
              Sign In
            </Button>
            <Button
              variant={mode === 'signup' ? 'contained' : 'outlined'}
              onClick={() => setMode('signup')}
              sx={{
                backgroundColor: mode === 'signup' ? 'black' : 'white',
                color: mode === 'signup' ? 'white' : 'black',
                width: 180,
              }}
            >
              Sign Up
            </Button>
          </Box>

          {/* Forma centrirana ispod dugmadi */}
          <Box sx={{ width: '100%' }}>
            {mode === 'signin' ? <SignInForm /> : <SignUpForm />}
          </Box>
        </Box>
      </Box>

      {/* Right: Background Image */}
      <Box
        sx={{
          flex: 1,
          backgroundImage: `url(${Fotka})`, // Ensure this is correctly used with `url()`
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 10,
        }}
      />
    </Container>
  );
};

export default AuthPage;
