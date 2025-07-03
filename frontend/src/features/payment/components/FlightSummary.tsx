import React from 'react';
import { Typography, Paper } from '@mui/material';

interface FlightSummaryProps {
  flightData: {
    departureAirport: string;
    arrivalAirport: string;
    departureTime: string;
    currency: string;
    totalPrice: string;
  };
  selectedTier: string;
}

const FlightSummary: React.FC<FlightSummaryProps> = ({
  flightData,
  selectedTier,
}) => {
  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant='h6' gutterBottom>
        Flight Summary
      </Typography>
      <Typography>
        <strong>Route:</strong> {flightData.departureAirport} →{' '}
        {flightData.arrivalAirport}
      </Typography>
      <Typography>
        <strong>Date:</strong>{' '}
        {new Date(flightData.departureTime).toLocaleDateString()}
      </Typography>
      <Typography>
        <strong>Time:</strong>{' '}
        {new Date(flightData.departureTime).toLocaleTimeString()}
      </Typography>
      <Typography>
        <strong>Fare Type:</strong>{' '}
        {selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1)}
      </Typography>
      <Typography variant='h6' sx={{ mt: 2 }}>
        <strong>Total:</strong> {flightData.currency} {flightData.totalPrice}
      </Typography>
    </Paper>
  );
};

export default FlightSummary;
