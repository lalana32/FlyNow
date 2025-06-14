import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import { FaSubway } from 'react-icons/fa';
import TitleSection from './TitleSection';

interface Transport {
  type: string;
  tip: string;
  icon: React.ReactNode;
}

const TransportList = ({ transportation }: { transportation: Transport[] }) => {
  const theme = useTheme();

  return (
    <Box sx={{ p: 3 }}>
      <TitleSection
        icon={
          <FaSubway
            style={{ marginRight: 8, color: theme.palette.primary.main }}
          />
        }
        title='Getting Around'
      />
      <List sx={{ p: 0 }}>
        {transportation.map((item, index) => (
          <ListItem key={index} sx={{ p: 0, mb: 1 }}>
            <ListItemIcon sx={{ color: theme.palette.primary.main }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.type}
              secondary={item.tip}
              secondaryTypographyProps={{ color: 'text.secondary' }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TransportList;
