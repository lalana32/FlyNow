import { Controller } from 'react-hook-form';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';

interface LocationOption {
  name: string;
  iataCode: string;
}

interface AutocompleteFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  options: LocationOption[];
  label: string;
  freeSolo?: boolean;
  onFetchOptions?: (input: string) => void;
}

function AutocompleteSearchField<T extends FieldValues>({
  name,
  control,
  options,
  label,
  freeSolo = true,
  onFetchOptions,
}: AutocompleteFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const selectedOption =
          options.find((opt) => opt.iataCode === field.value) || null;

        return (
          <Autocomplete
            freeSolo={freeSolo}
            options={options}
            getOptionLabel={(option: string | LocationOption) =>
              typeof option === 'string'
                ? option
                : `${option.name} (${option.iataCode})`
            }
            value={selectedOption}
            onChange={(_, newValue) => {
              if (newValue && typeof newValue !== 'string') {
                field.onChange(newValue.iataCode);
              } else if (typeof newValue === 'string') {
                field.onChange('');
              } else {
                field.onChange('');
              }
            }}
            onInputChange={(_, newInputValue, reason) => {
              if (reason === 'input' && onFetchOptions) {
                onFetchOptions(newInputValue);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                variant='outlined'
                fullWidth
              />
            )}
          />
        );
      }}
    />
  );
}

export default AutocompleteSearchField;
