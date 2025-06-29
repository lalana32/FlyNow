import { Typography } from '@mui/material';
import type { Flight } from '../../models/models';

const FlightInfo = ({
  carrierCode,
  flightNumber,
  departureTime,
}: Pick<Flight, 'carrierCode' | 'flightNumber' | 'departureTime'>) => {
  const formatDate = (dateTime: string) =>
    new Date(dateTime).toLocaleDateString([], {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });

  return (
    <>
      <Typography variant='h6'>
        {carrierCode} {flightNumber}
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        {formatDate(departureTime)}
      </Typography>
    </>
  );
};

export default FlightInfo;
