import React from 'react';
import { Box, Button } from '@mui/material';
import { FiX, FiArrowRight } from 'react-icons/fi';

interface ActionButtonsProps {
  onClose: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onClose }) => {
  return (
    <Box display='flex' justifyContent='space-between' mt={4} gap={2}>
      <Button
        variant='outlined'
        color='primary'
        onClick={onClose}
        startIcon={<FiX />}
        sx={{
          px: 3,
          py: 1.5,
          borderRadius: 2,
          fontWeight: 500,
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        }}
      >
        Close
      </Button>
      <Button
        variant='contained'
        color='primary'
        onClick={onClose}
        endIcon={<FiArrowRight />}
        sx={{
          px: 4,
          py: 1.5,
          borderRadius: 2,
          fontWeight: 600,
          boxShadow:
            '0 4px 6px -1px rgba(99, 102, 241, 0.3), 0 2px 4px -1px rgba(99, 102, 241, 0.1)',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow:
              '0 10px 15px -3px rgba(99, 102, 241, 0.3), 0 4px 6px -2px rgba(99, 102, 241, 0.1)',
          },
          transition: 'all 0.2s ease',
        }}
      >
        Proceed to Cart
      </Button>
    </Box>
  );
};

export default ActionButtons;
