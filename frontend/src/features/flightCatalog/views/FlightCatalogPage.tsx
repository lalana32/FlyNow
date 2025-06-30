import { useSearchParams } from 'react-router-dom';
import { searchFlights } from '../../home/api/homeApi';
import type { FlightSearchResponse } from '../models/models';
import { Typography, Box, Paper } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';
import { MdOutlineFlightTakeoff, MdOutlineFlightLand } from 'react-icons/md';
import NoFlightsFound from '../components/NoFlightsFound';
import FlightSection from '../components/FlightSection';
import {
  PaperStyles,
  TypographyStyles,
} from '../styles/FlightCatalogPageStyles';

const FlightCatalog = () => {
  const [searchParams] = useSearchParams();

  const flightSearchParams = {
    origin: searchParams.get('origin') || '',
    destination: searchParams.get('destination') || '',
    departureDate: searchParams.get('departureDate') || '',
    returnDate: searchParams.get('returnDate') || '',
    adults: parseInt(searchParams.get('adults') || '1'),
  };

  const {
    data: flights,
    isLoading,
    isError,
    error,
  } = useQuery<FlightSearchResponse>({
    queryKey: ['flights', flightSearchParams],
    queryFn: () => searchFlights(flightSearchParams).then((res) => res.data),
    enabled:
      !!flightSearchParams.origin &&
      !!flightSearchParams.destination &&
      !!flightSearchParams.departureDate,

    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Error loading flights: {error.message}</div>;
  }

  if (!flights) {
    return <div>No flight data available</div>;
  }

  const { departureFlights = [], returnFlights = [] } = flights;
  return (
    <Box
      sx={{
        p: 3,
        background: 'linear-gradient(to bottom, #f5f7fa 0%, #e4e8eb 100%)',
        minHeight: '100vh',
      }}
    >
      <Paper elevation={0} sx={{ ...PaperStyles }}>
        <Typography variant='h3' sx={{ ...TypographyStyles }}>
          Available Flights
        </Typography>

        <FlightSection
          title='Departure Flights'
          icon={
            <MdOutlineFlightTakeoff
              style={{ fontSize: '2rem', color: 'black' }}
            />
          }
          flights={departureFlights}
        />
        <FlightSection
          title='Return Flights'
          icon={
            <MdOutlineFlightLand style={{ fontSize: '2rem', color: 'black' }} />
          }
          flights={returnFlights}
        />
        {departureFlights.length === 0 && returnFlights.length === 0 && (
          <NoFlightsFound />
        )}
      </Paper>
    </Box>
  );
};

export default FlightCatalog;
