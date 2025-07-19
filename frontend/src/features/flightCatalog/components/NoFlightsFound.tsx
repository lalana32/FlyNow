import { Box, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const NoFlightsFound = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 10,
        border: '1px dashed',
        borderColor: 'divider',
        borderRadius: 2,
      }}
    >
      <Typography variant='h5' sx={{ mb: 2 }}>
        No flights found
      </Typography>
      <Typography variant='body1' color='text.secondary' sx={{ mb: 3 }}>
        Try adjusting your search criteria
      </Typography>
      <Button
        component={NavLink}
        to='/home'
        variant='contained'
        sx={{ backgroundColor: 'black' }}
      >
        Go Back to search flights
      </Button>
    </Box>
  );
};

export default NoFlightsFound;
