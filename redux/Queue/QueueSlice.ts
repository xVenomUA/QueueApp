import { createSlice } from '@reduxjs/toolkit';
import {
  AddQueueAPI,
  CreateQueueAPI,
  GetQueueAPI,
  DeleteQueueAPI,
  UpdateQueueAPI,
} from './operation';
import { act } from 'react-test-renderer';

interface QueueComp {
  id: number;
  name: string;
  service: string;
  date: string;
  extraData: string;
  isMyQueue: boolean;
}
interface QueueState {
  queue: QueueComp[];
  dataByID: any;
}
const initialState = {
  queue: [],
  dataByID: '',
} as QueueState;

const Queue = createSlice({
  name: 'queue',
  initialState,
  reducers: {
    addQueue: (state, action) => {
      state.queue.push(action.payload);
    },
    removeQueue: (state, action) => {
      state.queue = state.queue.filter(queue => queue.id !== action.payload.id);
    },
    findById: (state, action) => {
      state.dataByID = state.queue.find(queue => queue.id === action.payload.id);
    },
  },
  extraReducers(builder) {
    builder.addCase(CreateQueueAPI.fulfilled, (state, action) => {
      state.queue.push(action.payload);
    });
    builder.addCase(GetQueueAPI.fulfilled, (state, action) => {
      state.queue = action.payload;
    });
    builder.addCase(AddQueueAPI.fulfilled, (state, action) => {
      state.queue.push(action.payload);
    });
    builder.addCase(DeleteQueueAPI.fulfilled, (state, action) => {
      state.queue = state.queue.filter(queue => queue.id !== action.payload.id);
    });
    builder.addCase(UpdateQueueAPI.fulfilled, (state, action) => {
      state.queue = state.queue.map(queue =>
        queue.id === action.payload.id ? { ...queue, ...action.payload } : queue
      );
    });
  },
});

export const QueueSlice = Queue.reducer;
export const { addQueue, removeQueue, findById } = Queue.actions;

export const selectQueue = (state: { queue: QueueState }) => state.queue.queue;
export const selectQueueByID = (state: { queue: QueueState }) => state.queue.dataByID;
