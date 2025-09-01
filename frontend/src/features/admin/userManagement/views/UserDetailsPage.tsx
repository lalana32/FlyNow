import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { getBookingByUserId, getUserById } from '../api/userManagementApi';
import type { BookingDto } from '../../../myBookings/models/models';
import UserInfo from '../components/UserInfo';
import UserBookings from '../components/UserBookings';
import UserActions from '../components/UserActions';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  role: string;
}

const UserDetailsPage = () => {
  const { id } = useParams();
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
      <UserActions
        userId={user.id}
        firstName={user.firstName}
        lastName={user.lastName}
      />

      <UserInfo user={user} />
      <UserBookings bookings={bookings} />
    </Box>
  );
};

export default UserDetailsPage;
