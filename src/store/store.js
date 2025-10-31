import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';

// Global Redux store configuration
const store = configureStore({
    reducer: {
        auth: authSlice, // Registers authentication slice for state management
    },
});

export default store;
