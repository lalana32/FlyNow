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
import EditUserModal from './EditUserModal';

interface UserActionsProps {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
}

const UserActions = ({
  userId,
  firstName,
  lastName,
  email,
  userName,
}: UserActionsProps) => {
  const navigate = useNavigate();
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleDeleteConfirm = async () => {
    try {
      await deleteUser(userId);
      navigate('/user-management');
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
          <IconButton color='primary' onClick={() => setOpenEdit(true)}>
            <FiEdit size={20} />
          </IconButton>
          <IconButton color='error' onClick={() => setOpenDelete(true)}>
            <FiTrash2 size={20} />
          </IconButton>
        </Stack>
      </Stack>

      {/* Confirm delete dialog */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
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
          <Button onClick={() => setOpenDelete(false)} color='primary'>
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

      {/* Edit user modal */}
      <EditUserModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        user={{ id: userId, firstName, lastName, email, userName }}
        onSuccess={() => {
          console.log('User updated successfully!');
        }}
      />
    </>
  );
};

export default UserActions;
