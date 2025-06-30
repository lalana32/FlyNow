import { Typography, Link, Grid } from '@mui/material';

const FooterLinks = () => (
  <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ px: '60px' }}>
    <Typography variant='h6' sx={{ color: 'white' }} gutterBottom>
      Links
    </Typography>
    <Link href='/' underline='hover' color='white' display='block'>
      About us
    </Link>
    <Link href='/catalog' underline='hover' color='white' display='block'>
      Help
    </Link>
    <Link href='/contact' underline='hover' color='white' display='block'>
      Book
    </Link>
    <Link href='/contact' underline='hover' color='white' display='block'>
      Manage
    </Link>
  </Grid>
);

export default FooterLinks;
