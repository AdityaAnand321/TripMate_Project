import { createSlice } from "@reduxjs/toolkit";

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: [],
  reducers: {
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

export const { toggleFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;
