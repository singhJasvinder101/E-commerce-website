import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const userInfoInLocalStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : sessionStorage.getItem("userInfo")
        ? JSON.parse(sessionStorage.getItem("userInfo"))
        : {}
// console.log(userInfoInLocalStorage)

const LoginUserSlice = createSlice({
    name: "Handling_Login",
    initialState: {
        userInfo: userInfoInLocalStorage,
    },
    reducers: {
        setReduxUserState(state, action) {
            state.userInfo = { ...state.userInfo, ...action.payload };
        },
        logoutUser(state, action) {
            window.location.href = "/login";
            axios.get("/api/logout")
            localStorage.removeItem("userInfo");
            sessionStorage.removeItem("userInfo");
            state.userInfo = {};
        }
        // , userInfo: action.payload 
    }
})

export const { setReduxUserState, logoutUser } = LoginUserSlice.actions;
export default LoginUserSlice.reducer