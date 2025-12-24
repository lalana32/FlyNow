import { Grid, TextField, type SxProps, type Theme } from '@mui/material';
import { Controller } from 'react-hook-form';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

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
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          if (type === 'date') {
            const parsedValue = value ? dayjs(value) : null;

            return (
              <DatePicker
                label={label}
                value={parsedValue}
                enableAccessibleFieldDOMStructure={false}
                sx={{ width: '180px' }}
                onChange={(date) => {
                  onChange(date ? dayjs(date).format('YYYY-MM-DD') : null);
                }}
                slots={{ textField: TextField }}
                slotProps={{
                  textField: {
                    error: !!error,
                    helperText: error?.message,
                    placeholder: placeholder,
                  },
                }}
              />
            );
          }

          return (
            <TextField
              {...{ onChange, value }}
              label={label}
              type={type}
              variant='outlined'
              InputLabelProps={{ shrink: true }}
              placeholder={placeholder}
              inputProps={inputProps}
              error={!!error}
              helperText={error?.message}
              sx={sx}
            />
          );
        }}
      />
    </Grid>
  );
};

export default SearchField;
