import axios from 'axios';
import { API_URL } from '../auth/operation';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const CreateQueueAPI = createAsyncThunk(
  'queue/createQueue',
  async (data: { name: string; service: string; date: string; extraData: string }, thunk) => {
    try {
      const resp = await axios.post(`${API_URL}/queue`, data);
      return resp.data;
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);

export const GetQueueAPI = createAsyncThunk('queue/getQueue', async (_, thunk) => {
  try {
    const resp = await axios.get(`${API_URL}/queue`);
    return resp.data;
  } catch (error) {
    return thunk.rejectWithValue(error);
  }
});

export const AddQueueAPI = createAsyncThunk('queue/addQueue', async (data: any, thunk) => {
  console.log(data);
  try {
    const resp = await axios.post(`${API_URL}/queue`, data);
    return resp.data;
  } catch (error) {
    console.log(error);
    return thunk.rejectWithValue(error);
  }
});

export const DeleteQueueAPI = createAsyncThunk('queue/deleteQueue', async (id: string, thunk) => {
  try {
    const resp = await axios.delete(`${API_URL}/queue/${id}`);
    return resp.data;
  } catch (error) {
    return thunk.rejectWithValue(error);
  }
});

export const UpdateQueueAPI = createAsyncThunk(
  'queue/updateQueue',
  async (
    data: { id: string; name: string; date: string; extraData: string },
    thunk
  ) => {
    try {
      const resp = await axios.patch(`${API_URL}/queue/${data.id}`, {
        name: data.name,
        date: data.date,
        extraData: data.extraData,
      });
      return resp.data;
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);
