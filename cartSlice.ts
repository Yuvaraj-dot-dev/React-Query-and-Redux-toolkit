import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

type CartState = {
  cartItems: CartItem[];
  amount: number;
  total: number;
  isLoading: boolean;
};

const initialState: CartState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      state.cartItems.push(action.payload);
      state.amount += 1;
      state.total += action.payload.price * action.payload.quantity;
    },
removeItem: (state, action: PayloadAction<number>) => {
  const itemToRemove = state.cartItems.find((item) => item.id === action.payload);

  if (itemToRemove) {
    // subtract before removing
    state.amount -= 1;
    state.total -= itemToRemove.price * itemToRemove.quantity;
    state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
  }
},

    clearCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer; // 👈 export only reducer
