import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Tooltip,
  IconButton,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
} from '@mui/material';
import { FiMenu } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { logout } from '../../features/auth/state/authSlice';
import {
  MenuStyles,
  ToolbarStyles,
  TypographyStyles,
} from '../styles/navBarStyles';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMyProfile = () => {
    navigate('my-profile');
    handleClose();
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    handleClose();
  };

  const open = Boolean(anchorEl);

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
          ...ToolbarStyles,
        }}
      >
        <Typography
          variant='h6'
          sx={{
            ...TypographyStyles,
            fontSize: scrolled ? '1.3rem' : '1.8rem',
            // Svetlucavi efekat na tekstu
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
          <>
            <IconButton onClick={handleOpen} size='small' sx={{ ml: 2 }}>
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
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                ...MenuStyles,
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleMyProfile}>My Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
