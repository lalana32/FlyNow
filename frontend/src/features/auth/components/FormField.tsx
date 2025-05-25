import { TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material';

type FormFieldProps = TextFieldProps & {
  label: string;
  type: string;
};

const FormField = ({ label, type, ...props }: FormFieldProps) => {
  return (
    <TextField
      label={label}
      type={type}
      fullWidth
      margin='normal'
      variant='outlined'
      {...props}
      sx={{
        // Target the border of the outlined input and make it always the custom color
        '& .MuiOutlinedInput-root': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#60f7f5', // Custom border color when not focused
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#60f7f5', // Custom color on hover
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#60f7f5', // Custom color when focused
          },
        },
        // Custom color for the label
        '& .MuiInputLabel-root': {
          color: '#b9bdbd', // Custom label color
        },
        '& .Mui-focused .MuiInputLabel-root': {
          color: '#b9bdbd', // Custom label color when focused
        },
      }}
    />
  );
};

export default FormField;
