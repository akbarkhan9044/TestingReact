import { createSlice } from "@reduxjs/toolkit";

const initialState={
    cart:[]
}

export const cartSlice=createSlice({
    name:"cartSlice",
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const id=action.payload.id;
            const itemExists=state.cart.findIndex((item)=>item.id === id);
            if(itemExists<0){
                state.cart.push(action.payload);
            }else if(itemExists>=0){
                const filterData=state.cart.filter((item)=>item.id !== id);
                state.cart=filterData;
            }
        }
    }
});


export const {addToCart}=cartSlice.actions;
export default cartSlice.reducer;