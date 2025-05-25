import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../api/authApi';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import type { LoginDto, LoginResponse, User } from '../models/models';

interface AuthState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const userFromStorage = localStorage.getItem('user');

const initialState: AuthState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  status: 'idle',
  error: null,
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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.status = 'succeeded';
          state.user = action.payload;
          localStorage.setItem('user', JSON.stringify(action.payload));
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
