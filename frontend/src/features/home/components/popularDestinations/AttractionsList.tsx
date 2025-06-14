import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import { FaCamera } from 'react-icons/fa';
import TitleSection from './TitleSection';

interface Attraction {
  name: string;
  type: string;
  image: string;
}

const AttractionsList = ({ attractions }: { attractions: Attraction[] }) => {
  const theme = useTheme();

  return (
    <Box sx={{ p: 3 }}>
      <TitleSection
        icon={
          <FaCamera
            style={{ marginRight: 8, color: theme.palette.primary.main }}
          />
        }
        title='Must-See Attractions'
      />
      <List sx={{ p: 0 }}>
        {attractions.map((item, index) => (
          <ListItem key={index} sx={{ p: 0, mb: 2 }}>
            <ListItemIcon sx={{ minWidth: 56 }}>
              <Avatar
                src={item.image}
                variant='rounded'
                sx={{
                  width: 56,
                  height: 56,
                  mr: 2,
                  boxShadow: theme.shadows[1],
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={<Typography fontWeight={600}>{item.name}</Typography>}
              secondary={item.type}
              secondaryTypographyProps={{ color: 'text.secondary' }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AttractionsList;
