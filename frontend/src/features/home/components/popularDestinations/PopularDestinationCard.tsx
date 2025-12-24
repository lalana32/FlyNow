import { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
} from '@mui/material';
import { FaStar, FaPlane, FaBookOpen } from 'react-icons/fa';
import TravelGuide from './TravelGuide';

interface PopularDestinationCardProps {
  imageUrl: string;
  city: string;
  country: string;
  price: number;
  rating: number;
  flightCount: number;
}

const PopularDestinationCard = ({
  imageUrl,
  city,
  country,
  price,
  rating,
  flightCount,
}: PopularDestinationCardProps) => {
  const [guideOpen, setGuideOpen] = useState(false);

  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          borderRadius: 2,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 6px 24px rgba(0,0,0,0.15)',
          },
        }}
      >
        <CardMedia
          component='img'
          height='200'
          image={imageUrl}
          alt={`${city}, ${country}`}
        />

        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {city}, {country}
          </Typography>

          <Box display='flex' justifyContent='space-between' mb={2}>
            <Chip icon={<FaStar />} label={rating} />
            <Typography variant='h6'>From ${price}</Typography>
          </Box>

          <Box display='flex' alignItems='center' mb={3}>
            <FaPlane style={{ marginRight: 8 }} />
            <Typography variant='body2'>
              {flightCount}+ daily flights
            </Typography>
          </Box>

          {/* Dugme koje otvara Travel Guide */}
          <Button
            fullWidth
            variant='outlined'
            startIcon={<FaBookOpen />}
            onClick={() => setGuideOpen(true)}
            sx={{ mt: 2 }}
          >
            Travel Guide
          </Button>
        </CardContent>
      </Card>

      {/* Travel Guide modal */}
      <TravelGuide
        city={city}
        country={country}
        open={guideOpen}
        onClose={() => setGuideOpen(false)}
      />
    </>
  );
};

export default PopularDestinationCard;
