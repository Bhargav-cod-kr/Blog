import { createSlice } from "@reduxjs/toolkit";

// Initial authentication state
const initialState = {
    status: false,       // Tracks whether user is authenticated
    userData: null,      // Stores current user information
};

// Redux slice for handling authentication state
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Sets authenticated user data and marks user as logged in
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },

        // Clears authentication state on logout
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
    },
});

// Export actions and reducer for global use
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
