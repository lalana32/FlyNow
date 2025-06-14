import { TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material';
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
  type RegisterOptions,
  type Path,
} from 'react-hook-form';

type FormFieldProps<T extends FieldValues> = TextFieldProps & {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  type: string;
  rules?: RegisterOptions<T, Path<T>>;
};
const FormField = <T extends FieldValues>({
  name,
  control,
  label,
  type,
  rules,
  ...props
}: FormFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextField
          label={label}
          type={type}
          fullWidth
          margin='normal'
          {...field}
          {...props} // value, onChange, onBlur, name dolaze ovde
        />
      )}
    />
  );
};

export default FormField;
