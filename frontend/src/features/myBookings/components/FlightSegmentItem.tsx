import { Box, Typography } from '@mui/material';
import {
  MdFlightTakeoff,
  MdFlightLand,
  MdConfirmationNumber,
} from 'react-icons/md';
import type { FlightSegmentDto } from '../models/models';

interface Props {
  segment: FlightSegmentDto;
  isLast: boolean;
}

const FlightSegmentItem = ({ segment, isLast }: Props) => {
  return (
    <Box>
      <Box display='flex' alignItems='center' gap={1}>
        <MdFlightTakeoff size={20} />
        <Typography variant='body1'>
          {segment.departureAirport} at{' '}
          {new Date(segment.departureTime).toLocaleTimeString()}
        </Typography>
      </Box>
      <Box display='flex' alignItems='center' gap={1}>
        <MdFlightLand size={20} />
        <Typography variant='body1'>
          {segment.arrivalAirport} at{' '}
          {new Date(segment.arrivalTime).toLocaleTimeString()}
        </Typography>
      </Box>
      <Box display='flex' alignItems='center' gap={1}>
        <MdConfirmationNumber size={20} />
        <Typography variant='body1'>
          {segment.carrierCode} {segment.flightNumber}
        </Typography>
      </Box>
      {!isLast && <hr style={{ margin: '8px 0' }} />}
    </Box>
  );
};

export default FlightSegmentItem;
