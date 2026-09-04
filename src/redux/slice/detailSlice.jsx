import { createSlice } from "@reduxjs/toolkit";
import { fetchSingleProduct } from "../action/fetchSingleProduct";

const initialState={
    product:{},
    error:null,
    pending:true
}

export const detailSlice=createSlice({
    name:"detailSlice",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchSingleProduct.fulfilled,(state,action)=>{
            state.product=action.payload;
            state.error=null;
            state.pending=false
        });
        builder.addCase(fetchSingleProduct.rejected,(state,action)=>{
            state.product={};
            state.error=action.payload || "Error while fetching product";
            state.pending=false;
        });
        builder.addCase(fetchSingleProduct.pending,(state)=>{
            state.error=null;
            state.pending=true;
            state.product={};
        })
    }
    
})

export default detailSlice.reducer;
