import { Grid, TextField, type SxProps, type Theme } from '@mui/material';
import { Controller } from 'react-hook-form'; // vrednost, komponenta
import type { Control, FieldValues, Path } from 'react-hook-form'; // samo tipovi

interface Props<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  type: 'text' | 'date' | 'number';
  placeholder?: string;
  gridSize?: { xs?: number; sm?: number; md?: number };
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  sx?: SxProps<Theme>;
}

const SearchField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  control,
  type,
  gridSize = { xs: 12, sm: 6, md: 2 },
  inputProps,
  sx,
}: Props<T>) => {
  return (
    <Grid {...gridSize} sx={sx}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={label}
            type={type}
            variant='outlined'
            InputLabelProps={{ shrink: true }}
            placeholder={placeholder}
            inputProps={inputProps}
          />
        )}
      />
    </Grid>
  );
};

export default SearchField;
