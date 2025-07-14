import React from 'react';
import { Grid, TextField, InputAdornment } from '@mui/material';

interface FormInputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  gridMd?: number;
}

const FormInputField: React.FC<FormInputFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  icon,
}) => {
  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <TextField
        required
        fullWidth
        type={type}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        InputProps={{
          startAdornment: icon ? (
            <InputAdornment position='start'>{icon}</InputAdornment>
          ) : undefined,
        }}
      />
    </Grid>
  );
};

export default FormInputField;
