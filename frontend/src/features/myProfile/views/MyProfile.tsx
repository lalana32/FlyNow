import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Stack,
  Divider,
  Snackbar,
  Alert,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { useState } from 'react';
import { editUserInfo } from '../api/myProfileApi';
import type { EditUserDto } from '../models/models';
import { logout } from '../../auth/state/authSlice';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const user = useAppSelector((state) => state.auth.user!.data);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [email, setEmail] = useState(user.email || '');
  const [username, setUsername] = useState(user.username || '');

  const [openToast, setOpenToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);

  const handleSaveChanges = async () => {
    try {
      const payload: EditUserDto = {
        firstName,
        lastName,
        email,
        username,
      };

      await editUserInfo(payload, user.id);

      setOpenToast(true);
    } catch (err) {
      console.error('Error updating user:', err);
      setErrorToast(true);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 8,
        px: 2,
        background: 'white',
        minHeight: '100vh',
        py: 6,
      }}
    >
      <Card
        sx={{
          maxWidth: 700,
          width: '100%',
          borderRadius: 4,
          boxShadow: 0,
          background: '#ffffff',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: 4,
          }}
        >
          <Avatar
            sx={{
              bgcolor: 'black',
              width: 100,
              height: 100,
              fontSize: 36,
              mb: 2,
            }}
          >
            {user?.username?.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant='h5' fontWeight={600}>
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant='body1' sx={{ opacity: 0.6 }}>
            @{user.username}
          </Typography>
        </Box>

        <CardContent>
          <Divider sx={{ my: 3 }} />

          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                label='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                label='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                label='Ime'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                label='Prezime'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>

          <Stack direction='row' spacing={3} justifyContent='center' mt={4}>
            <Button
              variant='contained'
              color='primary'
              onClick={handleSaveChanges}
              sx={{ px: 0, borderRadius: 3, width: '160px' }}
            >
              Save Changes
            </Button>

            <Button
              variant='outlined'
              color='error'
              onClick={handleLogout}
              sx={{ px: 4, borderRadius: 3, width: '160px' }}
            >
              Logout
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Toast za uspjeh */}
      <Snackbar
        open={openToast}
        autoHideDuration={3000}
        onClose={() => setOpenToast(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity='success' onClose={() => setOpenToast(false)}>
          Profil uspješno ažuriran!
        </Alert>
      </Snackbar>

      {/* Toast za grešku */}
      <Snackbar
        open={errorToast}
        autoHideDuration={3000}
        onClose={() => setErrorToast(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity='error' onClose={() => setErrorToast(false)}>
          Greška prilikom ažuriranja profila.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MyProfile;
