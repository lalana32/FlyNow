import React from 'react';
import { Box, TableCell, TableRow } from '@mui/material';
import { FiCheck, FiX } from 'react-icons/fi';
import {
  BsFillHandbagFill,
  BsFillBackpackFill,
  BsFillSuitcaseFill,
} from 'react-icons/bs';

interface FeatureRowProps {
  feature: string;
  basic: boolean;
  regular: boolean;
  plus: boolean;
  index: number;
}

const FeatureRow: React.FC<FeatureRowProps> = ({
  feature,
  basic,
  regular,
  plus,
  index,
}) => {
  return (
    <TableRow
      sx={{
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: '#f1f5f9',
          transform: 'scale(1.005)',
        },
        '&:not(:last-child)': {
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        },
      }}
    >
      <TableCell sx={{ py: 2, fontWeight: 500, color: '#334155' }}>
        <Box display='flex' alignItems='center' gap={1}>
          {index % 3 === 0 && <BsFillHandbagFill />}
          {index % 3 === 1 && <BsFillBackpackFill />}
          {index % 3 === 2 && <BsFillSuitcaseFill />}
          {feature}
        </Box>
      </TableCell>
      {['basic', 'regular', 'plus'].map((tier) => (
        <TableCell key={tier} align='center' sx={{ py: 2 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 28,
              height: 28,
              borderRadius: '50%',
              backgroundColor: (
                tier === 'basic' ? basic : tier === 'regular' ? regular : plus
              )
                ? tier === 'plus'
                  ? 'rgba(99, 102, 241, 0.1)'
                  : tier === 'regular'
                  ? 'rgba(16, 185, 129, 0.1)'
                  : 'rgba(156, 163, 175, 0.1)'
                : 'transparent',
            }}
          >
            {(
              tier === 'basic' ? basic : tier === 'regular' ? regular : plus
            ) ? (
              <FiCheck
                size={18}
                color={
                  tier === 'plus'
                    ? '#6366f1'
                    : tier === 'regular'
                    ? '#10b981'
                    : '#6b7280'
                }
              />
            ) : (
              <FiX size={18} color='#cbd5e1' />
            )}
          </Box>
        </TableCell>
      ))}
    </TableRow>
  );
};

export default FeatureRow;
