import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register } from '../api/authApi';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import type {
  LoginDto,
  LoginResponse,
  RegisterDto,
  User,
} from '../models/models';

interface AuthState {
  user: User | null;

  login: {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  };

  registration: {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
    error: string | null;
  };
}

const userFromStorage = localStorage.getItem('user');

const initialState: AuthState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  login: {
    status: 'idle',
    error: null,
  },

  registration: {
    status: 'idle',
    message: null,
    error: null,
  },
};

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginDto,
  {
    rejectValue: string;
  }
>('auth/loginUser', async (credentials, thunkAPI) => {
  try {
    const response = await login(credentials);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;

    return thunkAPI.rejectWithValue(
      error.response?.data.message || 'Login failed'
    );
  }
});

export const registerUser = createAsyncThunk<
  string,
  RegisterDto,
  {
    rejectValue: string;
  }
>('auth/registerUser', async (credentials, thunkAPI) => {
  try {
    const response = await register(credentials);
    return response.data.message;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;

    return thunkAPI.rejectWithValue(
      error.response?.data.message || 'Registration failed'
    );
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.login.status = 'idle';
      state.login.error = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder

      //LOGIN
      .addCase(loginUser.pending, (state) => {
        state.login.status = 'loading';
        state.login.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.login.status = 'succeeded';
          state.user = action.payload;
          localStorage.setItem('user', JSON.stringify(action.payload));
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.login.status = 'failed';
        state.login.error = action.payload as string;
      })

      //REGISTER
      .addCase(registerUser.pending, (state) => {
        state.registration.status = 'loading';
        state.registration.error = null;
        state.registration.message = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.registration.status = 'succeeded';
          state.registration.message = action.payload;
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.registration.status = 'failed';
        state.registration.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
