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
    />
  );
};

export default FormField;
