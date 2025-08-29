import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  Divider,
  ListItemText,
} from '@mui/material';
import { getBookingByUserId, getUserById } from '../api/userManagementApi';
import type { BookingDto } from '../../../myBookings/models/models';
import React from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  role: string;
}

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<BookingDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    Promise.all([getUserById(id), getBookingByUserId(id)])
      .then(([userRes, bookingRes]) => {
        setUser(userRes.data.data);
        setBookings(bookingRes.data);
      })
      .catch((err) => {
        console.error('Error fetching user or bookings', err);
        setError('Failed to load user data');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color='error'>{error}</Typography>;
  if (!user) return <Typography>User not found</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Button variant='contained' onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back
      </Button>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant='h4' gutterBottom>
          User Details
        </Typography>
        <Typography>
          <strong>Username:</strong> {user.userName}
        </Typography>
        <Typography>
          <strong>Email:</strong> {user.email}
        </Typography>
        <Typography>
          <strong>First Name:</strong> {user.firstName || '-'}
        </Typography>
        <Typography>
          <strong>Last Name:</strong> {user.lastName || '-'}
        </Typography>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant='h5' gutterBottom>
          Bookings
        </Typography>
        {bookings.length === 0 ? (
          <Typography>No bookings for this user</Typography>
        ) : (
          <List>
            {bookings.map((booking) => (
              <React.Fragment key={booking.id}>
                <ListItem>
                  <ListItemText
                    primary={`Booking ID: ${booking.id}`}
                    secondary={
                      <>
                        <Typography variant='body2'>
                          Date: {new Date(booking.bookingDate).toLocaleString()}
                        </Typography>
                        <Typography variant='body2'>
                          Total Price: {booking.totalPrice} {booking.currency}
                        </Typography>
                        <Typography variant='body2'>
                          Flights:{' '}
                          {booking.flightSegments
                            .map(
                              (fs) =>
                                `${fs.departureAirport} → ${fs.arrivalAirport}`
                            )
                            .join(', ')}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default UserDetails;
