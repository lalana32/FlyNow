import React from 'react';
import { TextField, Grid, Box } from '@mui/material';
import { FaCreditCard } from 'react-icons/fa6';

interface PaymentDetailsFormProps {
  details: {
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentDetailsForm: React.FC<PaymentDetailsFormProps> = ({
  details,
  onChange,
}) => {
  return (
    <Box component='form' sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            required
            fullWidth
            label='Name on Card'
            name='cardName'
            value={details.cardName}
            onChange={onChange}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            required
            fullWidth
            label='Card Number'
            name='cardNumber'
            value={details.cardNumber}
            onChange={onChange}
            InputProps={{
              startAdornment: <FaCreditCard />,
              inputProps: { maxLength: 16 },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            required
            fullWidth
            label='Expiry Date'
            name='expiryDate'
            placeholder='MM/YY'
            value={details.expiryDate}
            onChange={onChange}
            inputProps={{ maxLength: 5 }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            required
            fullWidth
            label='CVV'
            name='cvv'
            type='password'
            value={details.cvv}
            onChange={onChange}
            inputProps={{ maxLength: 3 }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PaymentDetailsForm;
