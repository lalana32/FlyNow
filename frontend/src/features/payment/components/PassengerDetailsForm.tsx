import React from 'react';
import { TextField, Grid, Box } from '@mui/material';
import { GoPersonFill } from 'react-icons/go';
import { MdAssignment } from 'react-icons/md';

interface PassengerDetailsFormProps {
  details: {
    firstName: string;
    lastName: string;
    passportNumber: string;
    email: string;
    phone: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PassengerDetailsForm: React.FC<PassengerDetailsFormProps> = ({
  details,
  onChange,
}) => {
  return (
    <Box component='form' sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            required
            fullWidth
            label='First Name'
            name='firstName'
            value={details.firstName}
            onChange={onChange}
            InputProps={{
              startAdornment: <GoPersonFill />,
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            required
            fullWidth
            label='Last Name'
            name='lastName'
            value={details.lastName}
            onChange={onChange}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            required
            fullWidth
            label='Passport Number'
            name='passportNumber'
            value={details.passportNumber}
            onChange={onChange}
            InputProps={{
              startAdornment: <MdAssignment />,
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            required
            fullWidth
            label='Email'
            name='email'
            type='email'
            value={details.email}
            onChange={onChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            required
            fullWidth
            label='Phone Number'
            name='phone'
            value={details.phone}
            onChange={onChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PassengerDetailsForm;
