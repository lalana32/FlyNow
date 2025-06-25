import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Box,
  Tooltip,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FiMenu } from 'react-icons/fi';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  return (
    <AppBar
      position='fixed'
      elevation={scrolled ? 12 : 8}
      sx={{
        background: scrolled
          ? 'linear-gradient(90deg, #0f2027, #203a43, #2c5364)' // Tamni gradient za scrolled
          : 'linear-gradient(90deg, #1c1c1c, #2c2c2c)', // Tamnija, ali jača boja i bez providnosti
        backdropFilter: 'blur(20px)',
        transition: 'all 0.5s ease',
        height: scrolled ? 56 : 80,
        justifyContent: 'center',
        boxShadow: scrolled
          ? '0 8px 24px rgba(0,0,0,0.7)'
          : '0 4px 12px rgba(0,0,0,0.5)',
      }}
    >
      <Toolbar
        sx={{
          height: '100%',
          px: { xs: 2, sm: 4 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant='h6'
          sx={{
            flexGrow: 1,
            fontWeight: 900,
            fontSize: scrolled ? '1.3rem' : '1.8rem',
            color: '#fff',
            userSelect: 'none',
            transition: 'font-size 0.3s ease',
            cursor: 'default',
            letterSpacing: '0.1em',
            textShadow: '0 0 8px rgba(255,255,255,0.3)', // Svetlucavi efekat na tekstu
          }}
        >
          KiFly ✈️
        </Typography>

        {isMobile ? (
          <IconButton
            color='inherit'
            onClick={toggleMobileMenu}
            aria-label='toggle menu'
            sx={{ ml: 1 }}
          >
            <FiMenu size={28} />
          </IconButton>
        ) : (
          <Tooltip title='Logged in as John Doe' arrow>
            <Avatar
              alt='User Avatar'
              src='https://i.pravatar.cc/150?img=12'
              sx={{
                width: scrolled ? 36 : 48,
                height: scrolled ? 36 : 48,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                boxShadow: scrolled
                  ? '0 0 16px 4px rgba(255,255,255,0.85)'
                  : '0 0 8px 2px rgba(255,255,255,0.5)',
                '&:hover': {
                  boxShadow: '0 0 24px 6px rgba(255,255,255,1)',
                },
              }}
            />
          </Tooltip>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
