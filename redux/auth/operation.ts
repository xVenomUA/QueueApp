import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export const API_URL = 'http://192.168.84.45:8080/api/v1';
export const SignInAPI = createAsyncThunk(
  'auth/signIn',
  async (data: { email: string; password: string }, thunk) => {
    try {
      const resp = await axios.post(`${API_URL}/auth/login`, data);
      await AsyncStorage.setItem('token', resp.data.access_token);
      return resp.data;
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);

export const SignUpAPI = createAsyncThunk(
  'auth/signUp',
  async (data: { email: string; password: string; username: string }, thunk) => {
    try {
      const resp = await axios.post(`${API_URL}/auth/register`, data);
      await AsyncStorage.setItem('token', resp.data.access_token);
      return resp.data;
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);

export const getUserAPi = createAsyncThunk('auth/getUserbyID', async (_, thunk) => {
  try {
    const resp = await axios.get(`${API_URL}/user`);
    return resp.data;
  } catch (error) {
    return thunk.rejectWithValue(error);
  }
});

export const patchUserAPi = createAsyncThunk(
  'auth/patchUser',
  async (data: { username: string; email: string; password?: string }, thunk) => {
    try {
      const resp = await axios.patch(`${API_URL}/user`, data);
      return resp.data;
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);
