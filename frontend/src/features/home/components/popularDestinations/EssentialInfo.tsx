import { Box, Chip, useTheme } from '@mui/material';
import { FaInfoCircle } from 'react-icons/fa';
import TitleSection from './TitleSection';

const EssentialInfo = ({ tips }: { tips: string[] }) => {
  const theme = useTheme();

  return (
    <Box sx={{ p: 3 }}>
      <TitleSection
        icon={
          <FaInfoCircle
            style={{ marginRight: 8, color: theme.palette.primary.main }}
          />
        }
        title='Essential Information'
      />
      <Box display='flex' flexWrap='wrap' gap={1} mb={3}>
        {tips.map((tip, index) => (
          <Chip
            key={index}
            label={tip}
            variant='outlined'
            sx={{ borderRadius: 1 }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default EssentialInfo;
