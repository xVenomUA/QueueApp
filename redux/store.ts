import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./auth/AuthSlice";
import { QueueSlice } from "./Queue/QueueSlice";


const store = configureStore({ 
    reducer: {
        auth: AuthSlice, 
        queue: QueueSlice,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})
export const { dispatch } = store; 

export default store;