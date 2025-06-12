import { Box } from '@mui/material';
import type { FlightSearchParams } from '../models/models';
import FlightSearchForm from '../components/FlightSearchForm';
import { searchFlights } from '../api/homeApi';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const handleSearch = async (data: FlightSearchParams) => {
    try {
      navigate(`/flight-catalog?${new URLSearchParams(data)}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ position: 'relative', pb: 10 }}>
      {/* Hero Image */}
      <Box
        sx={{
          height: '400px',
          backgroundImage:
            'url(https://c.ekstatic.net/ecl/aircraft-interior/premium-economy/emirates-premium-economy-seat-w1920x480.jpg?h=_WrZVzOa_-M3hhiFNdXD7g)', // ili tvoja putanja
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Search Panel */}
      <FlightSearchForm onSearch={handleSearch} />
    </Box>
  );
};

export default HomePage;
