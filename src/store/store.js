import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user.slice";
import driverReducer from "./driver.slice";

const store = configureStore({
    reducer: {
        user: userReducer,
        driver: driverReducer
    }
})


export default store