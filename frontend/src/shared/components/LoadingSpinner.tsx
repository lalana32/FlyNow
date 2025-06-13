import { CircularProgress, Box, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';

// Animacija za pulsiranje teksta
const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

const LoadingSpinner = ({ message = 'Loading...' }: { message?: string }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '300px',
        gap: 2,
      }}
    >
      <CircularProgress
        size={60}
        thickness={4}
        sx={{
          color: (theme) => theme.palette.primary.main,
          animationDuration: '1.5s',
        }}
      />
      <Typography
        variant='h6'
        color='textSecondary'
        sx={{
          animation: `${pulse} 2s ease-in-out infinite`,
          fontWeight: 500,
          letterSpacing: '0.5px',
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;
