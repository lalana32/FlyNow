import { Typography } from '@mui/material';

const FlightTimeAndAirport = ({
  time,
  airport,
}: {
  time: string;
  airport: string;
}) => {
  const formatTime = (dateTime: string) =>
    new Date(dateTime).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <>
      <Typography variant='h5'>{formatTime(time)}</Typography>
      <Typography variant='body2' color='text.secondary'>
        {airport}
      </Typography>
    </>
  );
};

export default FlightTimeAndAirport;
