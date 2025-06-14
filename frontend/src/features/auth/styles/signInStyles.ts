import Fotka from '../../../assets/avion.png';

export const ContainerStyles = {
  display: 'flex',
  minHeight: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  p: 0,
};

export const PaperStyles = {
  display: 'flex',
  minHeight: 500,
  borderRadius: 4,
  overflow: 'hidden',
  width: '900px',
};

export const BoxStyles = {
  flex: '1 1 50%',
  px: 5,
  py: 4,
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

export const ImageContainerStyles = {
  flex: '1 1 50%',
  boxSizing: 'border-box',
  backgroundImage: `url(${Fotka})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  flexShrink: 0,
};
