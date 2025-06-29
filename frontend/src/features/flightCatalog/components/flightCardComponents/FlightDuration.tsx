import { Chip, Typography } from '@mui/material';

const FlightDuration = ({
  duration,
  stops,
}: {
  duration: string;
  stops: number;
}) => (
  <>
    <Chip label={duration} variant='outlined' />
    <Typography aphy variant='caption' display='block'>
      {stops === 0 ? 'Direct' : `${stops} stop(s)`}
    </Typography>
  </>
);

export default FlightDuration;
