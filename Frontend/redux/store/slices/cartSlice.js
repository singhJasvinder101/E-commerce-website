import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (payload, thunkAPI) => {
    try {
      const { productId, quantity } = payload;
      const response = await axios.get(`/api/products/get-one/${productId}`);
      const data = response.data;
      const newItem = {
        productId: data._id,
        name: data.name,
        image: data.images[0] ?? null,
        count: data.count,
        price: data.price,
        quantity: quantity
      };

      const state = thunkAPI.getState();
      const existingItem = state.cart.cartItems.find(
        item => item.productId === newItem.productId
      );


      if (existingItem) {
        // If the product already exists in the cart, update its quantity
        const updatedCartItems = state.cart.cartItems.map(item =>
          item.productId === newItem.productId ? { ...item, quantity: quantity } : item
        );
        return updatedCartItems

      } else {
        // If the product doesn't exist in the cart, add it as a new item
        return [...state.cart.cartItems, newItem];
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const cartInLocalStorage = JSON.parse(localStorage.getItem("cart")) || {}


const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: cartInLocalStorage.cartItems ? cartInLocalStorage.cartItems : [],
    itemsCount: cartInLocalStorage.itemsCount ? cartInLocalStorage.itemsCount : 0,
    cartSubtotal: cartInLocalStorage.cartSubtotal ? cartInLocalStorage.cartSubtotal : 0
  },
  reducers: {
    removeFromCart(state, action) {
      const { productId, quantity, price } = action.payload
      const updatedCartItems = state.cartItems.filter((item) => item.productId !== productId);
      const updatedItemsCount = state.itemsCount ? state.itemsCount - quantity : 0;
      const updatedCartSubtotal = state.cartSubtotal - price * quantity;

      localStorage.setItem('cart', JSON.stringify({
        cartItems: updatedCartItems,
        itemsCount: updatedItemsCount,
        cartSubtotal: updatedCartSubtotal
      }));
      return {
        ...state.cart,
        cartItems: state.cartItems.filter((x) => x.productId !== productId),
        itemsCount: state.itemsCount - quantity,
        cartSubtotal: state.cartSubtotal - (price * quantity)
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.cartItems = action.payload;
      state.itemsCount = action.payload.reduce(
        (count, item) => count + (item.quantity || 0), 0
      );
      state.cartSubtotal = action.payload.reduce(
        (subtotal, item) => subtotal + (item.price * (item.quantity || 0)), 0
      );
    });
  }
});
export const { removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
