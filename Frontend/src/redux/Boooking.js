import {createSlice} from '@reduxjs/toolkit'; 

const initialState=[];

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setBookings: (state, action) => {
            return action.payload || [];
        },
        add: (state, action) => {
            const place = action.payload;
            state.push(place);
        },
        remove: (state, action) => {
            const id = action.payload;
            const index = state.findIndex(item => item.id === id);
            if (index !== -1) state.splice(index, 1);
        }
    }
});

export const { setBookings, add, remove } = bookingSlice.actions;
export default bookingSlice.reducer;