import { Box, Typography } from '@mui/material';
import type { BookingItemDto } from '../models/models';

interface Props {
  item: BookingItemDto;
}

const BookingItem = ({ item }: Props) => {
  return (
    <Box>
      <Typography variant='body2'>
        {item.passengerName} {item.passengerLastName} (Seat {item.seatNumber})
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        Passport: {item.passengerPassportNumber} | Baggage:{' '}
        {item.baggageOptions}
      </Typography>
    </Box>
  );
};

export default BookingItem;
