import { Typography } from '@mui/material';
import type { ReactNode } from 'react';

const TitleSection = ({ icon, title }: { icon: ReactNode; title: string }) => (
  <Typography
    variant='h6'
    gutterBottom
    sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}
  >
    {icon}
    {title}
  </Typography>
);

export default TitleSection;
