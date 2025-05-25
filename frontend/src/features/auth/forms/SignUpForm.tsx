import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import SubmitButton from '../components/SubmitButton';
import FormField from '../components/FormField';

const SignUpForm = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 400,
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
      >
        <FormField label='username' type='text'></FormField>
        <FormField label='email' type='text'></FormField>
        <FormField label='password' type='password'></FormField>
        <SubmitButton variant='contained' text={'Login'} />
      </Paper>
    </Box>
  );
};

export default SignUpForm;
