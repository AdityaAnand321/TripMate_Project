import { configureStore } from "@reduxjs/toolkit";
import favouritesReducer from "./favouritesSlice";
import bookingReducer from "./Boooking";
import authReducer from './authSlice';
import api from '../Api/client';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favourites: favouritesReducer,
    booking: bookingReducer,
  },
});

// When logged in, sync favourites/bookings to backend (PUT) using cookie-based auth
let changeTimer = null;
store.subscribe(() => {
  const state = store.getState();
  const user = state.auth && state.auth.user;
  if (!user) return; // not logged in

  clearTimeout(changeTimer);
  changeTimer = setTimeout(async () => {
    try {
      await api.put(`/api/favourites/${encodeURIComponent(user.email)}`, state.favourites || []);
      await api.put(`/api/bookings/${encodeURIComponent(user.email)}`, state.booking || []);
    } catch (err) {
      console.error('Failed to sync to backend', err);
    }
  }, 400);
});
