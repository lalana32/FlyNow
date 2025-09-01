import React from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  Divider,
  ListItemText,
} from '@mui/material';
import type { BookingDto } from '../../../myBookings/models/models';

interface Props {
  bookings: BookingDto[];
}

const UserBookings = ({ bookings }: Props) => {
  return (
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
  );
};

export default UserBookings;
