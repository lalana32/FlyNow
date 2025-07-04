import { Box, Grid, Typography } from '@mui/material';
import type { BookingDto } from '../models/models';
import myBookingsApi from '../api/myBookingsApi';
import { useAppSelector } from '../../../hooks/hooks';
import BookingCard from '../components/BookingCard';
import { useQuery } from '@tanstack/react-query';

const fetchBookings = (userId: string) =>
  myBookingsApi.getByUserId(userId).then((res) => res.data);

const MyBookings = () => {
  const userId = useAppSelector((state) => state.auth.user.data.id);

  const {
    data: bookings = [],
    isLoading,
    error,
  } = useQuery<BookingDto[], Error>({
    queryKey: ['bookings', userId],
    queryFn: () => fetchBookings(userId),
    enabled: !!userId,
  });

  if (isLoading) return <div>Loading bookings...</div>;
  if (error) return <div>Error loading bookings: {error.message}</div>;

  return (
    <Box sx={{ p: 4, backgroundColor: '#f2f2f2', minHeight: '100vh' }}>
      <Typography variant='h4' gutterBottom sx={{ fontWeight: 600 }}>
        My Bookings
      </Typography>

      <Grid container spacing={3}>
        {bookings.map((booking) => (
          <Grid size={{ xs: 12, md: 6 }} key={booking.id}>
            <BookingCard booking={booking} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyBookings;
