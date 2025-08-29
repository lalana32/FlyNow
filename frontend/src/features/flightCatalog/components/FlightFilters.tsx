import { useState } from 'react';
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import type { FlightFiltersType } from '../models/models';

function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

interface FlightFiltersProps {
  onApply: (filters: FlightFiltersType) => void;
}

const FlightFilters = ({ onApply }: FlightFiltersProps) => {
  const [maxPrice, setMaxPrice] = useState('');
  const [maxDuration, setMaxDuration] = useState('');
  const [directOnly, setDirectOnly] = useState(false);
  const [sortOption, setSortOption] = useState('');

  const buildFilters = (
    overrides: Partial<FlightFiltersType> = {}
  ): FlightFiltersType => {
    let sortBy: string | undefined;
    let descending = false;

    switch (sortOption) {
      case 'priceAsc':
        sortBy = 'price';
        descending = false;
        break;
      case 'priceDesc':
        sortBy = 'price';
        descending = true;
        break;
      case 'durationAsc':
        sortBy = 'duration';
        descending = false;
        break;
      case 'durationDesc':
        sortBy = 'duration';
        descending = true;
        break;
    }

    return {
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      maxDuration: maxDuration || undefined,
      directOnly,
      sortBy,
      descending,
      ...overrides,
    };
  };

  const debouncedApply = debounce(
    (filters: FlightFiltersType) => onApply(filters),
    300
  );

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        boxShadow: 1,
        maxWidth: '100%',
        overflowX: 'auto',
        mb: 2,
      }}
    >
      <Box
        display='flex'
        flexDirection='row'
        flexWrap='wrap'
        gap={2}
        alignItems='center'
        justifyContent='space-evenly'
      >
        <TextField
          label='Max Price $'
          type='number'
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(e.target.value);
            debouncedApply(
              buildFilters({
                maxPrice: parseFloat(e.target.value) || undefined,
              })
            );
          }}
          size='small'
          sx={{ minWidth: 150 }}
        />

        <TextField
          label='Max Duration (hh:mm:ss)'
          value={maxDuration}
          onChange={(e) => {
            setMaxDuration(e.target.value);
            debouncedApply(
              buildFilters({ maxDuration: e.target.value || undefined })
            );
          }}
          placeholder='e.g. 02:00:00'
          size='small'
          sx={{ minWidth: 180 }}
        />

        <FormControl size='small' sx={{ minWidth: 200 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value);
              onApply(buildFilters({})); // odmah update
            }}
            label='Sort By'
          >
            <MenuItem value='priceAsc'>Price (Lowest First)</MenuItem>
            <MenuItem value='priceDesc'>Price (Highest First)</MenuItem>
            <MenuItem value='durationAsc'>Duration (Shortest First)</MenuItem>
            <MenuItem value='durationDesc'>Duration (Longest First)</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Checkbox
              checked={directOnly}
              onChange={(e) => {
                setDirectOnly(e.target.checked);
                onApply(buildFilters({ directOnly: e.target.checked }));
              }}
            />
          }
          label='Direct Only'
          sx={{ whiteSpace: 'nowrap' }}
        />
      </Box>
    </Box>
  );
};

export default FlightFilters;
