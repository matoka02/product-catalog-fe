import { createSlice } from '@reduxjs/toolkit';

import { ICartItem } from '../../types/CartItem';

type InitialState = {
  items: ICartItem[];
};

const initialState: InitialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    getInitialItems: (state) => {
      state.items = JSON.parse(localStorage.getItem('cart-items') || '[]');
    },
    addItemToCart: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem('cart-items', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(({ id }) => id !== action.payload);
      localStorage.setItem('cart-items', JSON.stringify(state.items));
    },
    increaseItemCount: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload) {
          item.count += 1;
        }

        return item;
      });
      localStorage.setItem('cart-items', JSON.stringify(state.items));
    },
    decreaseItemCount: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload) {
          item.count -= 1;
        }

        return item;
      });
      localStorage.setItem('cart-items', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItemToCart,
  getInitialItems,
  removeFromCart,
  increaseItemCount,
  decreaseItemCount,
  clearCart,
} = cartSlice.actions;
