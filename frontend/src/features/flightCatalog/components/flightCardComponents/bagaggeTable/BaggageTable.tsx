import React from 'react';
import {
  Collapse,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Paper,
  Fade,
} from '@mui/material';
import { FiPieChart } from 'react-icons/fi';
import TierHeader from './TierHeader';
import FeatureRow from './FeatureRow';
import PlanSelectionButtons from './PlanSelectionButtons';
import ActionButtons from './ActionButtons';
import { bagaggeData } from './data/baggageData';

interface BaggageTableProps {
  expanded: boolean;
  onClose: () => void;
  flightData: any; // or use a proper FlightData interface
  onPlanSelect: (tier: string, flightData: any) => void;
}

const BaggageTable: React.FC<BaggageTableProps> = ({
  expanded,
  onClose,
  flightData,
  onPlanSelect,
}) => {
  const handleSelectPlan = (tier: string) => {
    onPlanSelect(tier, flightData);
  };

  return (
    <Collapse in={expanded} timeout='auto' unmountOnExit>
      <Fade in={expanded} timeout={500}>
        <Box
          component={Paper}
          elevation={0}
          sx={{
            borderRadius: 4,
            p: 3,
            backgroundColor: '#ffffff',
            mt: 2,
          }}
        >
          <Typography
            variant='h5'
            sx={{ mb: 3, fontWeight: 700, color: '#2d3748' }}
          >
            <FiPieChart style={{ marginRight: 12, verticalAlign: 'middle' }} />
            Fare Comparison
          </Typography>

          <Box sx={{ width: '100%' }}>
            <Table size='medium' sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                  <TableCell
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '0.875rem',
                      color: '#64748b',
                    }}
                  >
                    Features
                  </TableCell>
                  {['basic', 'regular', 'plus'].map((tier) => (
                    <TierHeader
                      key={tier}
                      tier={tier as 'basic' | 'regular' | 'plus'}
                    />
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {bagaggeData.map((row, index) => (
                  <FeatureRow
                    key={row.feature}
                    feature={row.feature}
                    basic={row.basic}
                    regular={row.regular}
                    plus={row.plus}
                    index={index}
                  />
                ))}
                <PlanSelectionButtons onSelectPlan={handleSelectPlan} />
              </TableBody>
            </Table>
          </Box>

          <ActionButtons onClose={onClose} />
        </Box>
      </Fade>
    </Collapse>
  );
};

export default BaggageTable;
