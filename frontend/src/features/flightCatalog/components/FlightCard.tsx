import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Divider,
} from '@mui/material';

const FlightCard = () => {
  return (
    <Card sx={{ width: '100%', maxWidth: 800, my: 2 }}>
      <CardContent>
        <Grid container alignItems='center' spacing={2}>
          {/* Departure */}
          <Grid size={{ xs: 12, sm: 3 }}>
            <Box textAlign='center'>
              <Typography variant='h5' fontWeight='bold'>
                13:35
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Frankfurt (FRA)
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                15 Jun 2023
              </Typography>
            </Box>
          </Grid>

          {/* Flight icon and duration */}
          <Grid
            size={{ xs: 12, sm: 1 }}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            :D
            <Divider sx={{ width: '100%', my: 1 }} />
            <Typography variant='caption'>2h 10m</Typography>
            <Divider sx={{ width: '100%', my: 1 }} />
            :D
          </Grid>

          {/* Arrival */}
          <Grid size={{ xs: 12, sm: 3 }}>
            <Box textAlign='center'>
              <Typography variant='h5' fontWeight='bold'>
                15:45
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Tokyo (HND)
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                16 Jun 2023
              </Typography>
            </Box>
          </Grid>

          {/* Price */}
          <Grid size={{ xs: 12, sm: 3 }}>
            <Box textAlign='center'>
              <Typography variant='body2'>Starting from</Typography>
              <Typography variant='h5' color='primary' fontWeight='bold'>
                €127.00
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                one way
              </Typography>
            </Box>
          </Grid>

          {/* Action button */}
          <Grid
            size={{ xs: 12, sm: 3 }}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Button
              variant='contained'
              color='primary'
              size='large'
              sx={{ py: 1.5, px: 3 }}
            >
              Select
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FlightCard;
