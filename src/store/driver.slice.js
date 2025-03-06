import { createSlice } from "@reduxjs/toolkit";


const driverSlive = createSlice({
    name: "driver",
    initialState: {
        driverData: {},
        loading: true,
        error: null
    },
    reducers: {
        login: (state, action) => {
            state.driverData = action.payload.data;
            state.error = action.payload.error;
            state.loading = false;
        },
        logout: (state) => {
            state.driverData = {}
        }
    }
})


export const { login, logout } = driverSlive.actions;
export default driverSlive.reducer;