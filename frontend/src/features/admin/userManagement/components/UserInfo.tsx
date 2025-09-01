import { Paper, Typography } from '@mui/material';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  role: string;
}

interface Props {
  user: User;
}

const UserInfo = ({ user }: Props) => {
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant='h4' gutterBottom>
        User Details
      </Typography>
      <Typography>
        <strong>Username:</strong> {user.userName}
      </Typography>
      <Typography>
        <strong>Email:</strong> {user.email}
      </Typography>
      <Typography>
        <strong>First Name:</strong> {user.firstName || '-'}
      </Typography>
      <Typography>
        <strong>Last Name:</strong> {user.lastName || '-'}
      </Typography>
    </Paper>
  );
};

export default UserInfo;
