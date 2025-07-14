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
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BaggageOptions: React.FC<BaggageOptionsProps> = ({ value, onChange }) => {
  return (
    <Grid size={{ xs: 12 }}>
      <FormControl component='fieldset'>
        <FormLabel component='legend'>Baggage Option</FormLabel>
        <RadioGroup row name='baggageOptions' value={value} onChange={onChange}>
          <FormControlLabel value={0} control={<Radio />} label='Basic' />
          <FormControlLabel
            value='regular'
            control={<Radio />}
            label='Regular'
          />
          <FormControlLabel value='plus' control={<Radio />} label='Plus' />
        </RadioGroup>
      </FormControl>
    </Grid>
  );
};

export default BaggageOptions;
