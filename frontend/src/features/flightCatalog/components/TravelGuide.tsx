import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  IconButton,
  useTheme,
  Fade,
  Rating,
} from '@mui/material';
import {
  FaUtensils,
  FaCamera,
  FaSubway,
  FaInfoCircle,
  FaTimes,
  FaMapMarkerAlt,
  FaRegBookmark,
  FaBookmark,
} from 'react-icons/fa';
import { travelGuides } from '../data/travelGuidesData';

interface TravelGuideProps {
  city: string;
  country: string;
  open: boolean;
  onClose: () => void;
}

const TravelGuide = ({ city, country, open, onClose }: TravelGuideProps) => {
  const theme = useTheme();
  const [saved, setSaved] = useState(false);
  const [rating, setRating] = useState<number | null>(null);

  const cityKey = city.toLowerCase();
  const guideData = travelGuides[cityKey];

  const handleSaveGuide = () => {
    setSaved(!saved);
    // Ovdje možete dodati logiku za spremanje u bazu
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='md'
      fullWidth
      TransitionComponent={Fade}
      PaperProps={{
        sx: {
          borderRadius: '16px',
          background: theme.palette.background.paper,
        },
      }}
    >
      <DialogTitle sx={{ p: 3, position: 'relative' }}>
        <Box display='flex' alignItems='center' mb={1}>
          <FaMapMarkerAlt
            color={theme.palette.primary.main}
            style={{ marginRight: 8 }}
          />
          <Typography variant='h4' component='div' sx={{ fontWeight: 700 }}>
            {city}
          </Typography>
        </Box>
        <Typography variant='subtitle1' color='text.secondary'>
          {country}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          }}
        >
          <FaTimes />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 0 }}>
        {/* Hero slika */}

        {/* Osnovne informacije */}
        <Box sx={{ p: 3 }}>
          <Typography
            variant='h6'
            gutterBottom
            sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}
          >
            <FaInfoCircle
              style={{ marginRight: 8, color: theme.palette.primary.main }}
            />
            Essential Information
          </Typography>
          <Box display='flex' flexWrap='wrap' gap={1} mb={3}>
            {guideData.tips.map((tip, index) => (
              <Chip
                key={index}
                label={tip}
                variant='outlined'
                sx={{ borderRadius: 1 }}
              />
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Atrakcije */}
        <Box sx={{ p: 3 }}>
          <Typography
            variant='h6'
            gutterBottom
            sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}
          >
            <FaCamera
              style={{ marginRight: 8, color: theme.palette.primary.main }}
            />
            Must-See Attractions
          </Typography>
          <List sx={{ p: 0 }}>
            {guideData.attractions.map((item, index) => (
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
                  primary={
                    <Typography fontWeight={600}>{item.name}</Typography>
                  }
                  secondary={item.type}
                  secondaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Restorani */}
        <Box sx={{ p: 3 }}>
          <Typography
            variant='h6'
            gutterBottom
            sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}
          >
            <FaUtensils
              style={{ marginRight: 8, color: theme.palette.primary.main }}
            />
            Dining Recommendations
          </Typography>
          <List sx={{ p: 0 }}>
            {guideData.restaurants.map((item, index) => (
              <ListItem key={index} sx={{ p: 0, mb: 1 }}>
                <ListItemText
                  primary={
                    <Box display='flex' justifyContent='space-between'>
                      <Typography fontWeight={600}>{item.name}</Typography>
                      <Typography color='text.secondary'>
                        {item.price}
                      </Typography>
                    </Box>
                  }
                  secondary={item.cuisine}
                  secondaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Transport */}
        <Box sx={{ p: 3 }}>
          <Typography
            variant='h6'
            gutterBottom
            sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}
          >
            <FaSubway
              style={{ marginRight: 8, color: theme.palette.primary.main }}
            />
            Getting Around
          </Typography>
          <List sx={{ p: 0 }}>
            {guideData.transportation.map((item, index) => (
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
      </DialogContent>

      <DialogActions
        sx={{ p: 3, flexDirection: 'column', alignItems: 'stretch' }}
      >
        <Box mb={2}>
          <Typography variant='body2' gutterBottom align='center'>
            Was this guide helpful?
          </Typography>
          <Box display='flex' justifyContent='center'>
            <Rating
              value={rating}
              onChange={(_, newValue) => setRating(newValue)}
              size='large'
            />
          </Box>
        </Box>
        <Button
          onClick={onClose}
          variant='contained'
          size='large'
          sx={{
            borderRadius: 2,
            py: 1.5,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '1rem',
          }}
        >
          Close Travel Guide
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TravelGuide;
