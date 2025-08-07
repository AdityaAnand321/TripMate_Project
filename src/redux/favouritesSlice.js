// src/redux/favouritesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: [],
  reducers: {
    toggleFavourite: (state, action) => {
      const exists = state.find(item => item.id === action.payload.id);
      if (exists) {
        return state.filter(item => item.id !== action.payload.id);
      } else {
        state.push(action.payload);
      }
    }
  }
});

export const { toggleFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;
