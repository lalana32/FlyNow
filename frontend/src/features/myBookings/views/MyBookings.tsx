// MyBookings.tsx
import { Box, Grid, Typography, Paper, Stack, Button } from '@mui/material';
import {
  MdFlightTakeoff,
  MdFlightLand,
  MdDateRange,
  MdLocationOn,
  MdConfirmationNumber,
} from 'react-icons/md';

const bookings = [
  {
    id: 1,
    from: 'Sarajevo (SJJ)',
    fromTime: '08:45',
    to: 'Istanbul (IST)',
    toTime: '11:15',
    date: '2025-07-15',
    flightNumber: 'TK1023',
  },
  {
    id: 2,
    from: 'Belgrade (BEG)',
    fromTime: '14:10',
    to: 'Paris (CDG)',
    toTime: '17:30',
    date: '2025-08-02',
    flightNumber: 'AF1467',
  },
  {
    id: 3,
    from: 'Zagreb (ZAG)',
    fromTime: '19:00',
    to: 'London (LHR)',
    toTime: '21:40',
    date: '2025-09-10',
    flightNumber: 'BA841',
  },
];

const MyBookings = () => {
  return (
    <Box sx={{ p: 4, backgroundColor: '#f2f2f2', minHeight: '100vh' }}>
      <Typography variant='h4' gutterBottom sx={{ fontWeight: 600 }}>
        My Bookings
      </Typography>

      <Grid container spacing={3}>
        {bookings.map((booking) => (
          <Grid size={{ xs: 12, md: 6 }} key={booking.id}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <Stack spacing={2}>
                <Box display='flex' alignItems='center' gap={1}>
                  <MdFlightTakeoff color='black' size={22} />
                  <Typography variant='body1'>
                    <strong>Departure:</strong> {booking.from} at{' '}
                    {booking.fromTime}
                  </Typography>
                </Box>

                <Box display='flex' alignItems='center' gap={1}>
                  <MdFlightLand color='black' size={22} />
                  <Typography variant='body1'>
                    <strong>Arrival:</strong> {booking.to} at {booking.toTime}
                  </Typography>
                </Box>

                <Box display='flex' alignItems='center' gap={1}>
                  <MdDateRange color='black' size={22} />
                  <Typography variant='body1'>
                    <strong>Date:</strong> {booking.date}
                  </Typography>
                </Box>

                <Box display='flex' alignItems='center' gap={1}>
                  <MdConfirmationNumber color='black' size={22} />
                  <Typography variant='body1'>
                    <strong>Flight Number:</strong> {booking.flightNumber}
                  </Typography>
                </Box>
              </Stack>

              <Button
                variant='outlined'
                color='error'
                size='small'
                sx={{ height: '36px', mt: 1 }}
              >
                Cancel Booking
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyBookings;
