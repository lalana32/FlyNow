import { useState, useMemo, useEffect } from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import debounce from 'lodash.debounce';
import type {
  AmadeusLocationResponse,
  FlightSearchParams,
  LocationOption,
} from '../../models/models';
import SearchField from './SearchField';
import AutocompleteSearchField from './AutoCompleteSearchField';
import SearchButton from './SearchButton';
import { fetchSearchSuggestions } from '../../api/homeApi';
import { PaperStyles } from '../../styles/flightSearchFormStyles';

type Props = {
  onSearch?: (data: FlightSearchParams) => void;
};

const FlightSearchForm = ({ onSearch }: Props) => {
  const { control, handleSubmit } = useForm<FlightSearchParams>({
    defaultValues: {
      origin: '',
      destination: '',
      departureDate: '',
      returnDate: '',
      adults: 1,
    },
  });

  const [originOptions, setOriginOptions] = useState<LocationOption[]>([]);
  const [destinationOptions, setDestinationOptions] = useState<
    LocationOption[]
  >([]);

  const fetchSuggestions = async (
    input: string,
    setter: React.Dispatch<React.SetStateAction<LocationOption[]>>
  ) => {
    if (input.length < 3) {
      setter([]);
      return;
    }

    try {
      const response = await fetchSearchSuggestions(input);

      const data = response.data?.data;

      if (!Array.isArray(data)) {
        console.error('Unexpected API response format:', response.data);
        setter([]);
        return;
      }

      const locations: LocationOption[] = data.map(
        (item: AmadeusLocationResponse) => ({
          id: item.id,
          code: item.iataCode,
          name: item.name,
          city: item.address?.cityName || '',
          country: item.address?.countryName || '',
          iataCode: item.iataCode,
        })
      );

      setter(locations);
    } catch (error) {
      console.error('Failed to fetch location suggestions:', error);
      setter([]);
    }
  };

  const debouncedFetchOrigin = useMemo(
    () => debounce((value) => fetchSuggestions(value, setOriginOptions), 300),
    []
  );

  const debouncedFetchDestination = useMemo(
    () =>
      debounce((value) => fetchSuggestions(value, setDestinationOptions), 300),
    []
  );

  useEffect(() => {
    return () => {
      debouncedFetchOrigin.cancel();
      debouncedFetchDestination.cancel();
    };
  }, []);

  const onSubmit = (data: FlightSearchParams) => {
    if (onSearch) onSearch(data);
  };

  return (
    <Paper elevation={3} sx={{ ...PaperStyles }}>
      <Typography variant='h5' component='h1' gutterBottom sx={{ mb: 3 }}>
        Flight Search
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} alignItems='center' justifyContent='center'>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <AutocompleteSearchField
              name='origin'
              control={control}
              options={originOptions}
              onFetchOptions={debouncedFetchOrigin}
              label='From'
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <AutocompleteSearchField
              name='destination'
              control={control}
              options={destinationOptions}
              onFetchOptions={debouncedFetchDestination}
              label='From'
            />
          </Grid>

          <SearchField
            name='departureDate'
            control={control}
            type='date'
            label='Departure Date'
            gridSize={{ xs: 12, sm: 6, md: 2 }}
          />

          <SearchField
            name='returnDate'
            control={control}
            type='date'
            label='Return Date'
            gridSize={{ xs: 12, sm: 6, md: 2 }}
          />

          <SearchField
            name='adults'
            control={control}
            type='number'
            label='Passengers'
            gridSize={{ xs: 12, sm: 6, md: 2 }}
            sx={{ width: '163px' }}
            inputProps={{ min: 1 }}
          />

          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <SearchButton />
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default FlightSearchForm;
