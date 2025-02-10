import { createSlice } from "@reduxjs/toolkit";


const createSlice = createSlice({
    name: "driver",
    initialState: {
        driverData: {}
    },
    reducers: {
        login: (state, action) => {
            state.driverData = action.payload
        },
        logout: (state) => {
            state.driverData = {}
        }
    }
})


export const { login, logout } = createSlice.actions;
export default createSlice.reducer;