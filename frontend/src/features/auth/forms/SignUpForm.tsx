// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import SubmitButton from '../components/SubmitButton';
// import FormField from '../components/FormField';
// import { Controller, useForm } from 'react-hook-form';
// import type { RegisterDto } from '../models/models';
// import { registerUser } from '../state/authSlice';
// import { useAppDispatch } from '../../../hooks/hooks';
// import { useNavigate } from 'react-router-dom';

// const SignUpForm = () => {
//   const { control, handleSubmit } = useForm<RegisterDto>();
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   const handleRegisterSubmit = async (data: RegisterDto) => {
//     try {
//       const response = await dispatch(registerUser(data));
//       console.log(response);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexWrap: 'wrap',
//         '& > :not(style)': {
//           m: 1,
//           width: 400,
//         },
//       }}
//     >
//       <Paper
//         elevation={0}
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           flexDirection: 'column',
//         }}
//         component='form'
//         onSubmit={handleSubmit(handleRegisterSubmit)}
//       >
//         <Controller
//           name='username'
//           control={control}
//           defaultValue=''
//           render={({ field }) => (
//             <FormField
//               label='Username'
//               type='text'
//               {...field} // value, onChange, onBlur, name dolaze ovde
//             />
//           )}
//         />
//         <Controller
//           name='email'
//           control={control}
//           defaultValue=''
//           render={({ field }) => (
//             <FormField
//               label='Email'
//               type='text'
//               {...field} // value, onChange, onBlur, name dolaze ovde
//             />
//           )}
//         />
//         <Controller
//           name='password'
//           control={control}
//           defaultValue=''
//           render={({ field }) => (
//             <FormField
//               label='Password'
//               type='password'
//               {...field} // value, onChange, onBlur, name dolaze ovde
//             />
//           )}
//         />
//         <SubmitButton variant='contained' text={'Login'} type='submit' />
//       </Paper>
//     </Box>
//   );
// };

// export default SignUpForm;
