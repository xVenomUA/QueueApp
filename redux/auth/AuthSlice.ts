import { createSlice } from '@reduxjs/toolkit';
import { SignInAPI, SignUpAPI, getUserAPi, patchUserAPi } from './operation';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email: string;
  password?: string;
  username: string;
}
interface AuthState {
  user: User | null;
  loading: boolean;
  isLogged: boolean;
  error: string | null;
}
const initialState = {
  user: null,
  loading: false,
  isLogged: false,
  error: null,
} as AuthState;

const Auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state, action) => {
      state.loading = true;
      state.error = null;
      state.user = null;
      state.isLogged = false;
      AsyncStorage.removeItem('token');
    },
  },
  extraReducers(builder) {
    builder.addCase(SignInAPI.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(SignInAPI.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isLogged = true;
    });
    builder.addCase(SignInAPI.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? null;
    });
    builder.addCase(SignUpAPI.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(SignUpAPI.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isLogged = true;
    });
    builder.addCase(SignUpAPI.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to sign up';
    });
    builder.addCase(getUserAPi.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isLogged = true;
    });
    builder.addCase(patchUserAPi.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isLogged = true;
    });
  },
});

export const selectUser = (state: { auth: AuthState }) => state.auth.user;

export const AuthSlice = Auth.reducer;
export const { logout } = Auth.actions;
