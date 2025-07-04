import { Paper, Typography, Stack, Box, Button } from '@mui/material';
import type { BookingDto } from '../models/models';
import FlightSegmentItem from './FlightSegmentItem';
import BookingItem from './BookingItem';

interface Props {
  booking: BookingDto;
}

const BookingCard = ({ booking }: Props) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant='body2' color='text.secondary'>
        Booking Date: {new Date(booking.bookingDate).toLocaleString()}
      </Typography>

      <Typography variant='subtitle1' fontWeight={600}>
        Flight Details:
      </Typography>
      <Stack spacing={2}>
        {booking.flightSegments.map((segment, index) => (
          <FlightSegmentItem
            key={index}
            segment={segment}
            isLast={index === booking.flightSegments.length - 1}
          />
        ))}
      </Stack>

      <Typography variant='subtitle1' fontWeight={600}>
        Passengers:
      </Typography>
      <Stack spacing={1}>
        {booking.bookingItems.map((item, index) => (
          <BookingItem key={index} item={item} />
        ))}
      </Stack>

      <Typography variant='body1' fontWeight={600} mt={2}>
        Total: {booking.totalPrice} {booking.currency}
      </Typography>

      <Button
        variant='outlined'
        color='error'
        size='small'
        sx={{ alignSelf: 'flex-end', mt: 2 }}
      >
        Cancel Booking
      </Button>
    </Paper>
  );
};

export default BookingCard;
