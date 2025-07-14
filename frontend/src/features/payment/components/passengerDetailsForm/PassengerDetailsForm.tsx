import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import PassengerInfoFields from './PassengerInfoFields';
import BaggageOptions from './BaggageOptions';

interface PassengerDetailsFormProps {
  details: {
    firstName: string;
    lastName: string;
    passportNumber: string;
    email: string;
    phone: string;
    baggageOptions: number;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PassengerDetailsForm: React.FC<PassengerDetailsFormProps> = ({
  details,
  onChange,
}) => {
  return (
    <Box
      component='form'
      sx={{ my: 4, p: 3, border: '1px solid #ddd', borderRadius: 2 }}
    >
      <Typography variant='h6' sx={{ mb: 2 }}>
        Passenger Information
      </Typography>
      <Grid container spacing={2}>
        <PassengerInfoFields details={details} onChange={onChange} />
        <BaggageOptions value={details.baggageOptions} onChange={onChange} />
      </Grid>
    </Box>
  );
};

export default PassengerDetailsForm;
