import { Button } from '@mui/material';

const SearchButton = () => {
  return (
    <Button
      variant='contained'
      fullWidth
      type='submit'
      sx={{ height: '56px', backgroundColor: 'black' }}
    >
      Search Flights
    </Button>
  );
};

export default SearchButton;
