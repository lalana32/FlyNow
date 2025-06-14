import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import { FaUtensils } from 'react-icons/fa';
import TitleSection from './TitleSection';

interface Restaurant {
  name: string;
  price: string;
  cuisine: string;
}

const RestaurantsList = ({ restaurants }: { restaurants: Restaurant[] }) => {
  const theme = useTheme();

  return (
    <Box sx={{ p: 3 }}>
      <TitleSection
        icon={
          <FaUtensils
            style={{ marginRight: 8, color: theme.palette.primary.main }}
          />
        }
        title='Dining Recommendations'
      />
      <List sx={{ p: 0 }}>
        {restaurants.map((item, index) => (
          <ListItem key={index} sx={{ p: 0, mb: 1 }}>
            <ListItemText
              primary={
                <Box display='flex' justifyContent='space-between'>
                  <Typography fontWeight={600}>{item.name}</Typography>
                  <Typography color='text.secondary'>{item.price}</Typography>
                </Box>
              }
              secondary={item.cuisine}
              secondaryTypographyProps={{ color: 'text.secondary' }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default RestaurantsList;
