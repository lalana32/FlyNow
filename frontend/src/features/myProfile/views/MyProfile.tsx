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
} from '@mui/material';
import { useAppSelector } from '../../../hooks/hooks';
import { useState } from 'react';

const MyProfile = () => {
  const user = useAppSelector((state) => state.auth.user!.data);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSaveChanges = () => {
    console.log('Saving changes:', { firstName, lastName, phone });
  };

  const handleLogout = () => {
    console.log('Logout clicked');
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
            Stefan Lalovic
          </Typography>
          <Typography variant='body1' sx={{ opacity: 0.6 }}>
            @{user?.username}
          </Typography>
        </Box>

        <CardContent>
          <Divider sx={{ my: 3 }} />

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label='Email'
                value={user?.email}
                fullWidth
                InputProps={{ readOnly: false }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label='Ime'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label='Prezime'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label='Broj telefona'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
    </Box>
  );
};

export default MyProfile;
