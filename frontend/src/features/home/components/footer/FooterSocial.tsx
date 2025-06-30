import { Typography, Grid, Stack, Box } from '@mui/material';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa6';

const FooterSocial = () => (
  <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ px: '60px' }}>
    <Typography variant='h6' sx={{ color: 'white' }} gutterBottom>
      Follow us
    </Typography>
    <Stack gap={1} direction='column'>
      <Box display='flex' alignItems='center' gap={1}>
        <FaFacebook color='white' />
        <Typography variant='body2' sx={{ color: 'white' }}>
          Facebook
        </Typography>
      </Box>
      <Box display='flex' alignItems='center' gap={1}>
        <FaInstagram color='white' />
        <Typography variant='body2' sx={{ color: 'white' }}>
          Instagram
        </Typography>
      </Box>
      <Box display='flex' alignItems='center' gap={1}>
        <FaTwitter color='white' />
        <Typography variant='body2' sx={{ color: 'white' }}>
          Twitter
        </Typography>
      </Box>
    </Stack>
  </Grid>
);

export default FooterSocial;
