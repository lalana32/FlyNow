import { useState } from 'react';
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
} from '@mui/material';

const FlightFilters = ({ onApply }) => {
  const [maxPrice, setMaxPrice] = useState('');
  const [maxDuration, setMaxDuration] = useState('');
  const [directOnly, setDirectOnly] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [descending, setDescending] = useState(false);

  const handleSubmit = () => {
    const filters = {
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      maxDuration: maxDuration ? maxDuration : undefined,
      directOnly,
      sortBy: sortBy || undefined,
      descending,
    };
    onApply(filters);
  };

  return (
    <Box display='flex' flexDirection='column' gap={2}>
      <TextField
        label='Max Price'
        type='number'
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <TextField
        label='Max Duration (hh:mm:ss)'
        value={maxDuration}
        onChange={(e) => setMaxDuration(e.target.value)}
        placeholder='e.g. 02:00:00'
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={directOnly}
            onChange={(e) => setDirectOnly(e.target.checked)}
          />
        }
        label='Direct Flights Only'
      />
      <TextField
        label='Sort By'
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        placeholder='e.g. price, duration'
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={descending}
            onChange={(e) => setDescending(e.target.checked)}
          />
        }
        label='Descending Order'
      />
      <Button variant='contained' onClick={handleSubmit}>
        Apply Filters
      </Button>
    </Box>
  );
};

export default FlightFilters;
