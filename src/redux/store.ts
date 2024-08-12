import { configureStore } from "@reduxjs/toolkit";
import productReducer from './productSlice'
import userReducer from './UserSlice'

export const store = configureStore({
    reducer:{
        products:productReducer,
        users:userReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;