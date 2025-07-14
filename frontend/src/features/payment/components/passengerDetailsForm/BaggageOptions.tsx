import React from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
} from '@mui/material';

interface BaggageOptionsProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BaggageOptions: React.FC<BaggageOptionsProps> = ({ value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Convert to number immediately
    onChange(Number(event.target.value));
  };
  return (
    <Grid size={{ xs: 12 }}>
      <FormControl component='fieldset'>
        <FormLabel component='legend'>Baggage Option</FormLabel>
        <RadioGroup
          row
          name='baggageOptions'
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value='0' control={<Radio />} label='Basic (€0)' />
          <FormControlLabel
            value='1'
            control={<Radio />}
            label='Regular (+€30)'
          />
          <FormControlLabel value='2' control={<Radio />} label='Plus (+€60)' />
        </RadioGroup>
      </FormControl>
    </Grid>
  );
};

export default BaggageOptions;
