import Button from '@mui/material/Button';
import type { ButtonProps } from '@mui/material';

type SubmitButtonProps = ButtonProps & {
  text: string;
};

const SubmitButton = ({ text, ...props }: SubmitButtonProps) => {
  return (
    <Button
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
    >
      {text}
    </Button>
  );
};

export default SubmitButton;
