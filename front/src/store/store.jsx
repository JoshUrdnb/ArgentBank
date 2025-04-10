import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice' // Import du reducer

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
})