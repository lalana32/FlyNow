import { Box, Button, DialogActions, Rating, Typography } from '@mui/material';

const GuideFooter = ({
  rating,
  setRating,
  onClose,
}: {
  rating: number | null;
  setRating: (value: number | null) => void;
  onClose: () => void;
}) => {
  return (
    <DialogActions
      sx={{ p: 3, flexDirection: 'column', alignItems: 'stretch' }}
    >
      <Box mb={2}>
        <Typography variant='body2' gutterBottom align='center'>
          Was this guide helpful?
        </Typography>
        <Box display='flex' justifyContent='center'>
          <Rating
            value={rating}
            onChange={(_, newValue) => setRating(newValue)}
            size='large'
          />
        </Box>
      </Box>

      {/* Dugmad jedno pored drugog */}
      <Box display='flex' justifyContent='center' gap={2}>
        <Button
          onClick={onClose}
          variant='contained'
          size='large'
          sx={{
            borderRadius: 2,
            py: 1.5,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '1rem',
          }}
        >
          Send me to email
        </Button>
        <Button
          onClick={onClose}
          variant='contained'
          size='large'
          sx={{
            borderRadius: 2,
            py: 1.5,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '1rem',
          }}
        >
          Download to device
        </Button>
      </Box>
    </DialogActions>
  );
};

export default GuideFooter;
