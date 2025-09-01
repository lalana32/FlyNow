import { useState } from 'react';
import {
  Button,
  Stack,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../api/userManagementApi';

interface UserActionsProps {
  userId: string;
  firstName: string;
  lastName: string;
}

const UserActions = ({ userId, firstName, lastName }: UserActionsProps) => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const handleEdit = () => {
    navigate(`/users/edit/${userId}`);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteUser(userId);
      navigate('/user-management'); // nakon brisanja vrati na listu
    } catch (err) {
      console.error('Failed to delete user', err);
    }
  };

  return (
    <>
      <Stack
        direction='row'
        spacing={2}
        justifyContent='space-between'
        alignItems='center'
        sx={{ mb: 2 }}
      >
        <Button variant='contained' onClick={() => navigate(-1)}>
          Back
        </Button>

        <Stack direction='row' spacing={1}>
          <IconButton color='primary' onClick={handleEdit}>
            <FiEdit size={20} />
          </IconButton>
          <IconButton color='error' onClick={() => setOpenDialog(true)}>
            <FiTrash2 size={20} />
          </IconButton>
        </Stack>
      </Stack>

      {/* Confirm delete dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete user{' '}
            <b>
              {firstName} {lastName}
            </b>
            ? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color='error'
            variant='contained'
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserActions;
