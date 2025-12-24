import {
  Box,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import type { BookingDto } from '../models/models';
import myBookingsApi from '../api/myBookingsApi';
import { useAppSelector } from '../../../hooks/hooks';
import BookingCard from '../components/BookingCard';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';
import NoBookings from '../components/NoBookings';
import { useState } from 'react';

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

  const queryClient = useQueryClient();

  const cancelBookingMutation = useMutation<AxiosResponse<any>, Error, string>({
    mutationFn: (bookingId: string) => myBookingsApi.cancelBooking(bookingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings', userId] });
    },
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );

  const handleOpenDialog = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBookingId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedBookingId) {
      cancelBookingMutation.mutate(selectedBookingId);
    }
    handleCloseDialog();
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error loading bookings: {error.message}</div>;

  return (
    <Box sx={{ p: 4, backgroundColor: '#f2f2f2', minHeight: '100vh' }}>
      <Typography variant='h4' gutterBottom sx={{ fontWeight: 600 }}>
        My Bookings
      </Typography>

      {bookings.length === 0 ? (
        <NoBookings />
      ) : (
        <Grid container spacing={3}>
          {bookings.map((booking) => (
            <Grid size={{ xs: 12, md: 6 }} key={booking.id}>
              <BookingCard
                booking={booking}
                onDelete={() => handleOpenDialog(booking.id)}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Cancel Booking</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel this booking? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='inherit'>
            No
          </Button>
          <Button onClick={handleConfirmDelete} color='error' autoFocus>
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyBookings;
