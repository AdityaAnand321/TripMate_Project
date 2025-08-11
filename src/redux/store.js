import { configureStore } from "@reduxjs/toolkit";
import favouritesReducer from "./favouritesSlice";  
import bookingReducer from "./Boooking";

export const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
    booking:bookingReducer,
  }
});
