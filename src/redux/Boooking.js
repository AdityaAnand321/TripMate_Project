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
        },
        remove:(state,action)=>{
            const id=action.payload;
            const index=state.findIndex(item=>item.id===id);
            state.splice(index, 1);
        }

         
    }
});

export const {add,remove}=bookingSlice.actions;
export default bookingSlice.reducer;