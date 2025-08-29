import { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../api/userManagementApi';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers()
      .then((res) => setUsers(res.data.data))
      .catch((err) => console.error('Error fetching users', err))
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'username', headerName: 'Username', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant='h5' gutterBottom>
          User Management
        </Typography>

        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row.id}
          autoHeight
          loading={loading}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          onRowClick={(params) => {
            navigate(`/user-management/${params.id}`);
          }}
        />
      </Paper>
    </Box>
  );
};

export default UserManagement;
