import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NoBookings = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 8,
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant='h5' sx={{ mb: 2, fontWeight: 600 }}>
        You don’t have any bookings yet
      </Typography>
      <Typography variant='body1' sx={{ mb: 4, color: 'text.secondary' }}>
        Start exploring and book your first one!
      </Typography>
      <Button
        variant='contained'
        color='primary'
        onClick={() => navigate('/home')}
      >
        Browse Offers
      </Button>
    </Box>
  );
};

export default NoBookings;
