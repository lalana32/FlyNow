import { Typography, Grid, Stack } from '@mui/material';

const FooterContact = () => (
  <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ px: '60px' }}>
    <Typography variant='h6' sx={{ color: 'white' }} gutterBottom>
      Contact us
    </Typography>
    <Stack gap={0.5}>
      <Typography variant='body2' sx={{ color: 'white' }}>
        Support: support@flynow.com
      </Typography>
      <Typography variant='body2' sx={{ color: 'white' }}>
        Support: +387 66 111 222
      </Typography>
      <Typography variant='body2' sx={{ color: 'white' }}>
        Reservations: reservations@flynow.com
      </Typography>
      <Typography variant='body2' sx={{ color: 'white' }}>
        Reservations: +387 66 333 444
      </Typography>
    </Stack>
  </Grid>
);

export default FooterContact;
