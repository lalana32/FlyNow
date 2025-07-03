import { Grid, Chip, Button } from '@mui/material';

const FlightSeatsAndBooking = ({
  seatsLeft,
  onBookClick,
}: {
  seatsLeft: number;
  onBookClick: () => void;
}) => (
  <Grid container justifyContent='space-between' alignItems='center'>
    <Grid>
      <Chip label={`${seatsLeft} seats left`} size='small' />
    </Grid>
    <Grid>
      <Button variant='contained' color='primary' onClick={onBookClick}>
        Book flight
      </Button>
    </Grid>
  </Grid>
);

export default FlightSeatsAndBooking;
