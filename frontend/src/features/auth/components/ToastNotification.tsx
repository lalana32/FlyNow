import Snackbar from '@mui/material/Snackbar';

interface ToastProps {
  open: boolean;
  message: string;
  onClose: () => void;
  autoHideDuration?: number;
}

export const ToastNotification = ({
  open,
  message,
  onClose,
  autoHideDuration = 6000,
}: ToastProps) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      message={message}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{
        '& .MuiSnackbarContent-root': {
          justifyContent: 'center',
        },
      }}
    />
  );
};
