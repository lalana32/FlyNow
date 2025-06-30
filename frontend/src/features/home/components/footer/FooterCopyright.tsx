import { Box, Typography } from '@mui/material';

const FooterCopyright = () => (
  <Box textAlign='center' mt={4}>
    <Typography variant='body2' sx={{ color: 'white' }}>
      &copy; {new Date().getFullYear()} KiFly. All rights reserved.
    </Typography>
  </Box>
);

export default FooterCopyright;
