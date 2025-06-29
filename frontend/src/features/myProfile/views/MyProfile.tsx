import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Stack,
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { MdEdit } from 'react-icons/md';
import { useAppSelector } from '../../../hooks/hooks';

const MyProfile = () => {
  const user = useAppSelector((state) => state.auth.user!.data);
  console.log(user);

  const handleLogout = () => {
    console.log('Logout clicked');
    // ovde pozovi logout redux akciju ili obradi logout
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        'Da li ste sigurni da želite da obrišete nalog? Ova akcija je nepovratna.'
      )
    ) {
      console.log('Delete account clicked');
      // ovde pozovi API za brisanje naloga ili redux akciju
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 8,
        px: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          width: '100%',
          borderRadius: 4,
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          background: 'linear-gradient(135deg, #1f1f1f, #2a2a2a)',
          color: 'white',
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
              bgcolor: deepPurple[500],
              width: 100,
              height: 100,
              fontSize: 36,
              mb: 2,
            }}
          >
            {user?.username?.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant='h5' fontWeight={600}>
            {user?.username}
          </Typography>
          <Typography variant='body1' sx={{ opacity: 0.7 }}>
            @{user?.username}
          </Typography>
        </Box>

        <CardContent>
          <Grid container spacing={2} mt={1}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant='subtitle2' color='gray'>
                Email
              </Typography>
              <Typography variant='body1'>{user?.email}</Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant='subtitle2' color='gray'>
                Uloga
              </Typography>
              <Typography variant='body1'>{user?.role}</Typography>
            </Grid>
          </Grid>

          <Box textAlign='center' mt={4}>
            <Button
              variant='contained'
              color='primary'
              startIcon={<MdEdit size={20} />}
              sx={{
                borderRadius: 3,
                px: 4,
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
            >
              Uredi profil
            </Button>
          </Box>

          <Box mt={4}>
            <Stack direction='row' spacing={4} justifyContent='center'>
              <Button
                variant='contained'
                color='primary'
                onClick={handleLogout}
                sx={{
                  borderRadius: 3,
                  px: 4,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  minWidth: 140,
                }}
              >
                Logout
              </Button>

              <Button
                variant='contained'
                color='error'
                onClick={handleDeleteAccount}
                sx={{
                  borderRadius: 3,
                  px: 4,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  minWidth: 140,
                }}
              >
                Obriši nalog
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MyProfile;
