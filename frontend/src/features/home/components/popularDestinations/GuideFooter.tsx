import { Box, Button, DialogActions, Rating, Typography } from '@mui/material';

interface GuideFooterProps {
  rating: number | null;
  setRating: (value: number | null) => void;
  onClose: () => void;
  onDownload: () => void;
}

const GuideFooter = ({
  rating,
  setRating,
  onClose,
  onDownload,
}: GuideFooterProps) => {
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

      <Box display='flex' justifyContent='center' gap={2}>
        <Button
          onClick={onClose}
          variant='outlined'
          size='large'
          sx={{
            borderRadius: 2,
            py: 1.5,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '1rem',
          }}
        >
          Close
        </Button>
        <Button
          onClick={onDownload}
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
          Download PDF
        </Button>
      </Box>
    </DialogActions>
  );
};

export default GuideFooter;
