import { Box, Typography } from '@mui/material';
import type { Flight } from '../models/models';
import FlightCard from './FlightCard';

interface FlightSectionProps {
  title: string;
  icon: React.ReactNode;
  flights: Flight[];
}

const FlightSection = ({ title, icon, flights }: FlightSectionProps) => {
  if (flights.length === 0) return null;

  return (
    <Box sx={{ mb: 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        {icon}
        <Typography variant='h5' sx={{ color: 'text.secondary' }}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {flights.map((flight) => (
          <Box key={flight.id} sx={{ width: '100%' }}>
            <FlightCard {...flight} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FlightSection;
