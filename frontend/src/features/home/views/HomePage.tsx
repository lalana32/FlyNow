import { Box, Container, Typography } from '@mui/material';
import type { FlightSearchParams } from '../models/models';
import FlightSearchForm from '../components/searchForm/FlightSearchForm';
import { useNavigate } from 'react-router-dom';
import PopularDestinationCard from '../components/popularDestinations/PopularDestinationCard';
import Footer from '../components/footer/Footer';

const HomePage = () => {
  const navigate = useNavigate();
  const handleSearch = async (data: FlightSearchParams) => {
    try {
      const params = {
        ...data,
        adults: data.adults.toString(), // Convert number to string
      };
      navigate(`/flight-catalog?${new URLSearchParams(params)}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      {/* Hero sekcija */}
      <Box sx={{ position: 'relative', pb: 15 }}>
        {' '}
        {/* Povećan padding-bottom */}
        <Box
          sx={{
            height: '400px',
            backgroundImage:
              'url(https://calaero.edu/wp-content/uploads/2023/08/iStock-1332501286-scaled.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <FlightSearchForm onSearch={handleSearch} />
      </Box>

      {/* Popularne destinacije sekcija */}
      <Container maxWidth='lg' sx={{ mt: 5 }}>
        {' '}
        {/* Negativni margin-top za preklapanje */}
        <Typography
          variant='h4'
          align='center'
          sx={{
            mb: 6,
            fontWeight: 700,
            color: 'text.primary',
          }}
        >
          Popular Destinations
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 4,
            justifyContent: 'center',
          }}
        >
          {/* Kartica 1 */}
          <PopularDestinationCard
            imageUrl='https://images.unsplash.com/photo-1431274172761-fca41d930114?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBhcmlzfGVufDB8fDB8fHww'
            city='Paris'
            country='France'
            price={199}
            rating={4.8}
            flightCount={42}
          />

          {/* Kartica 2 */}
          <PopularDestinationCard
            imageUrl='https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9tZXxlbnwwfHwwfHx8MA%3D%3D'
            city='Rome'
            country='Italy'
            price={299}
            rating={4.7}
            flightCount={56}
          />

          {/* Kartica 3 */}
          <PopularDestinationCard
            imageUrl='https://plus.unsplash.com/premium_photo-1661914240950-b0124f20a5c1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9reW98ZW58MHx8MHx8fDA%3D'
            city='Tokyo'
            country='Japan'
            price={499}
            rating={4.9}
            flightCount={28}
          />
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default HomePage;
