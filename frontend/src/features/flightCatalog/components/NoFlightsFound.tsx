import { Box, Typography } from '@mui/material';

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
      <Typography variant='body1' color='text.secondary'>
        Try adjusting your search criteria
      </Typography>
    </Box>
  );
};

export default NoFlightsFound;
