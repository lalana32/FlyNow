import { Card, CardContent, Grid, Typography, Divider } from '@mui/material';
import type { Flight } from '../models/models';
import FlightDuration from './flightCardComponents/FlightDuration';
import FlightInfo from './flightCardComponents/FlightInfo';
import FlightSeatsAndBooking from './flightCardComponents/FlightSeatsAndBooking';
import FlightTimeAndAirport from './flightCardComponents/FlightTimeAndAirport';
import { useState } from 'react';
import BaggageTable from './flightCardComponents/bagaggeTable/BaggageTable';
import { useNavigate } from 'react-router-dom';

const FlightCard = (flight: Flight) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  const handlePlanSelect = (tier: string, flightData: any) => {
    navigate('/payment', {
      state: {
        flightData,
        selectedTier: tier,
      },
    });
  };

  return (
    <Card key={flight.id} sx={{ mb: 3, borderRadius: 2 }} elevation={3}>
      <CardContent>
        <Grid container spacing={2} alignItems='center'>
          <Grid size={{ xs: 12, md: 3 }}>
            <FlightInfo
              carrierCode={flight.carrierCode}
              flightNumber={flight.flightNumber}
              departureTime={flight.departureTime}
            />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <FlightTimeAndAirport
              time={flight.departureTime}
              airport={flight.departureAirport}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }} sx={{ textAlign: 'center' }}>
            <FlightDuration
              duration={flight.duration}
              stops={flight.numberOfStops}
            />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <FlightTimeAndAirport
              time={flight.arrivalTime}
              airport={flight.arrivalAirport}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 1 }} sx={{ textAlign: 'right' }}>
            <Typography variant='h6'>${flight.totalPrice}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {!expanded && (
          <FlightSeatsAndBooking
            seatsLeft={flight.numberOfBookableSeats}
            onBookClick={toggleExpanded}
          />
        )}
        <BaggageTable
          expanded={expanded}
          onClose={() => setExpanded(false)}
          flightData={flight}
          onPlanSelect={handlePlanSelect}
        />
      </CardContent>
    </Card>
  );
};

export default FlightCard;
