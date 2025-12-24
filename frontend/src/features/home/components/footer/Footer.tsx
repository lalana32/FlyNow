import { Box, Grid } from '@mui/material';
import FooterLinks from './FooterLinks';
import FooterContact from './FooterContact';
import FooterSocial from './FooterSocial';
import FooterCopyright from './FooterCopyright';

const Footer = () => {
  return (
    <Box
      component='footer'
      sx={{
        backgroundColor: 'black',
        padding: '2rem 0',
        mt: 5,
        borderTop: '1px solid #ddd',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Grid container justifyContent='center'>
        <FooterLinks />
        <FooterContact />
        <FooterSocial />
      </Grid>
      <Grid>
        <FooterCopyright />
      </Grid>
    </Box>
  );
};

export default Footer;
