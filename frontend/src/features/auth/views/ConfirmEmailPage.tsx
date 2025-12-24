import { Box, Paper, Typography, Button, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import {
  buttonStyles,
  mainBoxStyles,
  PaperStyles,
} from '../styles/confirmEmailStyles';

const ConfirmEmailPage = () => {
  return (
    <Box
      sx={{
        ...mainBoxStyles,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          ...PaperStyles,
        }}
      >
        <Stack spacing={3} alignItems='center'>
          <Box
            sx={{
              color: '#4caf50',
              fontSize: '4rem',
              lineHeight: 1,
            }}
          >
            <FaCheckCircle />
          </Box>

          <Typography
            variant='h4'
            component='h1'
            sx={{ fontWeight: 700, color: '#2d3748' }}
          >
            Email Verified!
          </Typography>

          <Typography
            variant='body1'
            sx={{ color: '#4a5568', fontSize: '1.1rem' }}
          >
            Your email address has been successfully verified. You now have full
            access to your account.
          </Typography>

          <Box sx={{ pt: 2, width: '100%' }}>
            <Button
              fullWidth
              variant='contained'
              size='large'
              component={RouterLink}
              to='/sign-in'
              sx={{
                ...buttonStyles,
              }}
            >
              Continue to login
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default ConfirmEmailPage;
