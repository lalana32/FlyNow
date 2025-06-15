import LoadingButton from '@mui/lab/LoadingButton';
import type { LoadingButtonProps } from '@mui/lab';
import { CircularProgress } from '@mui/material';

type SubmitButtonProps = LoadingButtonProps & {
  text: string;
  loading?: boolean;
};

const SubmitButton = ({
  text,
  loading = false,
  ...props
}: SubmitButtonProps) => {
  return (
    <LoadingButton
      sx={{
        backgroundColor: 'black',
        color: 'white',
        '&:hover': { backgroundColor: '#333' },
        width: '100%',
        height: (theme) => theme.spacing(7),
        marginTop: (theme) => theme.spacing(2),
      }}
      {...props}
      type='submit'
      variant='contained'
      loading={loading} // 👈 Omogućava loading stanje
      loadingIndicator={
        <CircularProgress
          size={24}
          sx={{ color: 'white' }} // 👈 Spinner beli umesto defaultne boje
        />
      } // 👈 Opcionalno: prilagodite tekst
    >
      {text}
    </LoadingButton>
  );
};

export default SubmitButton;
