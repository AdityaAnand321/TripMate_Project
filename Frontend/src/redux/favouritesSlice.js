import { createSlice } from "@reduxjs/toolkit";


const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: [],
  reducers: {
    setFavourites: (state, action) => {
      return action.payload || [];
    },
    clearFavourites: () => [],
    toggleFavourite: (state, action) => {
      const place = action.payload;
      const index = state.findIndex(item => item.id === place.id);
      if (index >= 0) {
        state.splice(index, 1);
      } else {
        state.push(place);
      }
    }
  }
});

export const { setFavourites, toggleFavourite, clearFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;
