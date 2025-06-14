export const mainBoxStyles = {
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  p: 2,
};

export const PaperStyles = {
  p: { xs: 3, sm: 4 },
  maxWidth: 500,
  width: '100%',
  textAlign: 'center',
  borderRadius: 3,
  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
  border: '1px solid rgba(255,255,255,0.3)',
  backdropFilter: 'blur(5px)',
  backgroundColor: 'rgba(255,255,255,0.9)',
};

export const buttonStyles = {
  py: 1.5,
  borderRadius: 2,
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  background: 'linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)',
  '&:hover': {
    background: 'linear-gradient(90deg, #2563eb 0%, #4f46e5 100%)',
  },
};
