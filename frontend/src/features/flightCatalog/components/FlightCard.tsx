import {
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  Chip,
  Divider,
  Button,
} from '@mui/material';
import type { Flight } from '../models/models';

const FlightCard = (flight: Flight) => {
  const formatTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (dateTime: string) => {
    return new Date(dateTime).toLocaleDateString([], {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };

  return (
    <Card key={flight.id} sx={{ mb: 3, borderRadius: 2 }} elevation={3}>
      <CardContent>
        <Grid container spacing={2} alignItems='center'>
          {/* Airline Info */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Stack direction='row' alignItems='center' spacing={1}>
              <Typography variant='h6' component='div'>
                {flight.carrierCode} {flight.flightNumber}
              </Typography>
            </Stack>
            <Typography variant='body2' color='text.secondary'>
              {formatDate(flight.departureTime)}
            </Typography>
          </Grid>

          {/* Departure Info */}
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography variant='h5' component='div'>
              {formatTime(flight.departureTime)}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {flight.departureAirport}
            </Typography>
          </Grid>

          {/* Duration */}
          <Grid size={{ xs: 12, md: 2 }} sx={{ textAlign: 'center' }}>
            <Chip label={flight.duration} variant='outlined' />
            <Typography variant='caption' display='block'>
              {flight.numberOfStops === 0
                ? 'Direct'
                : `${flight.numberOfStops} stop(s)`}
            </Typography>
          </Grid>

          {/* Arrival Info */}
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography variant='h5' component='div'>
              {formatTime(flight.arrivalTime)}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {flight.arrivalAirport}
            </Typography>
          </Grid>

          {/* Price */}
          <Grid size={{ xs: 12, md: 1 }}>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='flex-end'
            >
              <Typography variant='h6' component='div'>
                $ {flight.totalPrice}
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={1} justifyContent='space-between'>
          <Grid>
            <Chip
              label={`${flight.numberOfBookableSeats} seats left`}
              size='small'
            />
          </Grid>
          <Grid>
            <Button>Book flight</Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FlightCard;
