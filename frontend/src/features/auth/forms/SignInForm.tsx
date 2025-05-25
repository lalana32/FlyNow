import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import SubmitButton from '../components/SubmitButton';
import FormField from '../components/FormField';
import { useState } from 'react';
import { loginUser } from '../state/authSlice';
import { useAppDispatch } from '../../../hooks/useAppDispatch';

const SignInForm = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = { username, password };

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
        onSubmit={handleLoginSubmit}
      >
        <FormField
          label='username'
          type='text'
          onChange={handleUsernameChange}
        ></FormField>
        <FormField
          label='password'
          type='password'
          onChange={handlePasswordChange}
        ></FormField>
        <SubmitButton variant='contained' text={'Login'} type='submit' />
      </Paper>
    </Box>
  );
};

export default SignInForm;
