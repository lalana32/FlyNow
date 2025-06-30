export const MenuStyles = {
  elevation: 4,
  sx: {
    mt: 1.5,
    minWidth: 150,
    '& .MuiMenuItem-root': {
      px: 2,
      py: 1,
    },
  },
};

export const ToolbarStyles = {
  height: '100%',
  px: { xs: 2, sm: 4 },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

export const TypographyStyles = {
  color: '#fff',
  userSelect: 'none',
  transition: 'font-size 0.3s ease',
  cursor: 'pointer',
  letterSpacing: '0.1em',
  textShadow: '0 0 8px rgba(255,255,255,0.3)',
  flexGrow: 1,
  fontWeight: 900,
};
