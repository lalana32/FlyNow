import React from 'react';
import { Typography, Box } from '@mui/material';

interface ConfirmationStepProps {
  departureAirport: string;
  arrivalAirport: string;
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  departureAirport,
  arrivalAirport,
}) => {
  return (
    <Box sx={{ mt: 3, textAlign: 'center' }}>
      <Typography variant='h5' gutterBottom>
        Booking Confirmed!
      </Typography>
      <Typography variant='body1' sx={{ mb: 3 }}>
        Your flight from {departureAirport} to {arrivalAirport} has been booked
        successfully.
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        Confirmation number:{' '}
        {Math.random().toString(36).substring(2, 10).toUpperCase()}
      </Typography>
    </Box>
  );
};

export default ConfirmationStep;
