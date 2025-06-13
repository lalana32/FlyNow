import { useSearchParams } from 'react-router-dom';
import { searchFlights } from '../../home/api/homeApi';
import type { FlightSearchResponse } from '../models/models';
import { Typography, Box, Paper } from '@mui/material';
import FlightCard from '../components/FlightCard';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';
import { MdOutlineFlightTakeoff, MdOutlineFlightLand } from 'react-icons/md';

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
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Typography
          variant='h3'
          sx={{
            fontWeight: 700,
            color: 'primary.main',
            mb: 4,
            position: 'relative',
          }}
        >
          Available Flights
        </Typography>

        {departureFlights.length > 0 && (
          <Box sx={{ mb: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <MdOutlineFlightTakeoff
                style={{
                  fontSize: '2rem',
                  color: '#1976d2', // MUI primary color
                  marginRight: '8px',
                }}
              />
              <Typography
                variant='h5'
                sx={{
                  color: 'text.secondary',
                }}
              >
                Departure Flights
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
              }}
            >
              {departureFlights.map((flight) => (
                <Box key={flight.id} sx={{ width: '100%' }}>
                  <FlightCard {...flight} />
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {returnFlights.length > 0 && (
          <Box sx={{ mb: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <MdOutlineFlightLand
                style={{
                  fontSize: '2rem',
                  color: '#1976d2', // MUI primary color
                  marginRight: '8px',
                }}
              />
              <Typography
                variant='h5'
                sx={{
                  color: 'text.secondary',
                }}
              >
                Return Flights
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
              }}
            >
              {returnFlights.map((flight) => (
                <Box key={flight.id} sx={{ width: '100%' }}>
                  <FlightCard {...flight} />
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {departureFlights.length === 0 && returnFlights.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: 10,
              border: '1px dashed',
              borderColor: 'divider',
              borderRadius: 2,
            }}
          >
            <Typography variant='h5' sx={{ mb: 2 }}>
              No flights found
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              Try adjusting your search criteria
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default FlightCatalog;
