// here we create the store
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import userLoginRegisterSlice from "./slices/userLoginRegisterSlice"
import categorySlice from "./slices/categorySlice";

export const store = configureStore({
    reducer: {
        cart: cartSlice,
        userLoginRegister: userLoginRegisterSlice,
        allCategories: categorySlice,
    }
})
// console.log(store.getState().counters.count); // Output: 1

// configure store container only single object with reducer 
// which containes all the reducers

export default store