import { configureStore } from "@reduxjs/toolkit";
import favouritesReducer from "./favouritesSlice";  
import bookingReducer from "./Boooking";

// Simple localStorage persistence for favourites slice
const loadFavourites = () => {
  try {
    const raw = localStorage.getItem("favourites");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveFavourites = (favs) => {
  try {
    localStorage.setItem("favourites", JSON.stringify(favs ?? []));
  } catch {
    // ignore write errors
  }
};

// Booking persistence helpers
const loadBookings = () => {
  try {
    const raw = localStorage.getItem("bookings");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveBookings = (bookings) => {
  try {
    localStorage.setItem("bookings", JSON.stringify(bookings ?? []));
  } catch {
    // ignore write errors
  }
};

const preloadedState = {
  favourites: loadFavourites(),
  booking: loadBookings(),
};

export const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
    booking: bookingReducer,
  },
  preloadedState,
});

// Persist favourites on any change
store.subscribe(() => {
  const state = store.getState();
  saveFavourites(state.favourites);
  saveBookings(state.booking);
});
