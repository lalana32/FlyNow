import { Box, Paper, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const ConfirmEmailPage = () => {
  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
        backgroundColor: '#f5f5f5',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 400,
          textAlign: 'center',
          borderRadius: 2,
        }}
      >
        <Typography variant='h5' gutterBottom>
          Your email has been confirmed!
        </Typography>
        <Typography variant='body1' sx={{ mb: 3 }}>
          Thank you for confirming your email. You can now log in to your
          account.
        </Typography>

        <Button
          variant='contained'
          color='primary'
          component={RouterLink}
          to='/'
        >
          Go to Login
        </Button>
      </Paper>
    </Box>
  );
};

export default ConfirmEmailPage;
