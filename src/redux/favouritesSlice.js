import { createSlice } from "@reduxjs/toolkit";


const favouritesSlice = createSlice({
  name: "favourites",
  initialState: [],
  reducers: {
    clearFavourites: () => {
      return [];
    },
    toggleFavourite: (state, action) => {
      const place = action.payload;  
      const index = state.findIndex(item => item.id === place.id);

      if (index >= 0) { 
        state.splice(index, 1);
        try { localStorage.setItem('favourites', JSON.stringify(state)); } catch {}
      } else { 
        state.push(place);
        try { localStorage.setItem('favourites', JSON.stringify(state)); } catch {}
      }
    }
  }
});

export const { toggleFavourite, clearFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;
