import React from 'react';
import { Button, TableCell, TableRow } from '@mui/material';

interface PlanSelectionButtonsProps {
  onSelectPlan: (tier: string) => void;
}

const PlanSelectionButtons: React.FC<PlanSelectionButtonsProps> = ({
  onSelectPlan,
}) => {
  return (
    <TableRow>
      <TableCell sx={{ border: 'none' }} />
      {['basic', 'regular', 'plus'].map((tier) => (
        <TableCell key={tier} align='center' sx={{ border: 'none' }}>
          <Button
            variant='contained'
            size='small'
            color={'inherit'}
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              textTransform: 'none',
              px: 2,
              py: 1,
              mt: 1,
            }}
            onClick={() => onSelectPlan(tier)}
          >
            Choose this plan
          </Button>
        </TableCell>
      ))}
    </TableRow>
  );
};

export default PlanSelectionButtons;
