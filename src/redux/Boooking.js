import {createSlice} from '@reduxjs/toolkit'; 

const initialState=[];

const bookingSlice=createSlice({
    name:'booking',
    initialState,
    reducers:{
        add:(state,action)=>{
            const place=action.payload;
            const index=state.findIndex(item=>item.id===place.id);
            state.push(place);
        }
         
    }
});

export const {add}=bookingSlice.actions;
export default bookingSlice.reducer;