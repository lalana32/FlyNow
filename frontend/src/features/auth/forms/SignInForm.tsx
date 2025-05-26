import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import SubmitButton from '../components/SubmitButton';
import FormField from '../components/FormField';
import { loginUser } from '../state/authSlice';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { Controller, useForm } from 'react-hook-form';
import type { LoginDto } from '../models/models';

const SignInForm = () => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm<LoginDto>();

  const handleLoginSubmit = async (data: LoginDto) => {
    try {
      const response = await dispatch(loginUser(data));
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 400,
          height: 400,
        },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
        component='form'
        onSubmit={handleSubmit(handleLoginSubmit)}
      >
        <Controller
          name='username'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <FormField
              label='Username'
              type='text'
              {...field} // value, onChange, onBlur, name dolaze ovde
            />
          )}
        />
        <Controller
          name='password'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <FormField
              label='Password'
              type='password'
              {...field} // value, onChange, onBlur, name dolaze ovde
            />
          )}
        />
        <SubmitButton variant='contained' text={'Login'} type='submit' />
      </Paper>
    </Box>
  );
};

export default SignInForm;
