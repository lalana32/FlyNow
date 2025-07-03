import React from 'react';
import { Box, Typography, TableCell } from '@mui/material';
import { Md30Fps, Md60Fps, MdEuro } from 'react-icons/md';

interface TierHeaderProps {
  tier: 'basic' | 'regular' | 'plus';
}

const TierHeader: React.FC<TierHeaderProps> = ({ tier }) => {
  return (
    <TableCell align='center' sx={{ py: 2 }}>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        sx={{
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            mb: 1,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:
              tier === 'plus'
                ? 'rgba(99, 102, 241, 0.1)'
                : tier === 'regular'
                ? 'rgba(16, 185, 129, 0.1)'
                : 'rgba(156, 163, 175, 0.1)',
          }}
        >
          <img
            src={
              tier === 'plus'
                ? 'https://assets.ryanair.com/resources/ui/images/flights-dev/fare-table-header-plus@2x.webp'
                : tier === 'regular'
                ? 'https://assets.ryanair.com/resources/ui/images/flights-dev/fare-table-header-regular@2x.webp'
                : 'https://assets.ryanair.com/resources/ui/images/flights-dev/fare-table-header-standard@2x.webp'
            }
            alt={tier}
            style={{ height: '100px', borderRadius: '16px' }}
          />
        </Box>
        <Typography
          variant='subtitle1'
          sx={{
            textTransform: 'capitalize',
            fontWeight: 600,
            color:
              tier === 'plus'
                ? '#6366f1'
                : tier === 'regular'
                ? '#10b981'
                : '#6b7280',
          }}
        >
          {tier}
        </Typography>
        <Typography variant='caption' sx={{ mt: 0.5 }}>
          {tier === 'plus' ? (
            <>
              <Md60Fps /> <MdEuro />
            </>
          ) : tier === 'regular' ? (
            <>
              <Md30Fps /> <MdEuro />
            </>
          ) : (
            'free'
          )}
        </Typography>
      </Box>
    </TableCell>
  );
};

export default TierHeader;
