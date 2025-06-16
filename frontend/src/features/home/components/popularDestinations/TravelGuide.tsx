import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Divider,
  useTheme,
  Fade,
} from '@mui/material';
import { FaMapMarkerAlt, FaTimes } from 'react-icons/fa';
import { useState, useRef } from 'react';
import { travelGuides } from '../../../flightCatalog/data/travelGuidesData';
import EssentialInfo from './EssentialInfo';
import AttractionsList from './AttractionsList';
import RestaurantsList from './RestaurantsList';
import TransportList from './TransportList';
import GuideFooter from './GuideFooter';
import { usePDF } from 'react-to-pdf';

interface TravelGuideProps {
  city: string;
  country: string;
  open: boolean;
  onClose: () => void;
}

const TravelGuide = ({ city, country, open, onClose }: TravelGuideProps) => {
  const theme = useTheme();
  const [rating, setRating] = useState<number | null>(null);

  const cityKey = city.toLowerCase();
  const guideData = travelGuides[cityKey];

  const { toPDF, targetRef } = usePDF({
    filename: `${city}_Travel_Guide.pdf`,
    page: { margin: 10 },
  });

  const handleDownload = () => {
    toPDF();
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
      {/* Dodajte ref na cijeli sadržaj koji želite u PDF-u */}
      <div ref={targetRef}>
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
          <EssentialInfo tips={guideData.tips} />
          <Divider sx={{ my: 1 }} />
          <AttractionsList attractions={guideData.attractions} />
          <Divider sx={{ my: 1 }} />
          <RestaurantsList restaurants={guideData.restaurants} />
          <Divider sx={{ my: 1 }} />
          <TransportList transportation={guideData.transportation} />
        </DialogContent>
      </div>

      <GuideFooter
        rating={rating}
        setRating={setRating}
        onClose={onClose}
        onDownload={handleDownload}
      />
    </Dialog>
  );
};

export default TravelGuide;
