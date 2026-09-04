import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../action/fetchProduct";

const initialState={
    products:[],
    error:null,
    pending:false
}

export const productSlice=createSlice({
    name:"productSlice",
    initialState,
    reducers:{
        fetchAllProducts:(state,action)=>{
            
        }
    },extraReducers:(builder)=>{
        builder.addCase(fetchProducts.pending,(state,action)=>{
            state.pending=true;
            state.error=null;
            state.products=[]
        })
        builder.addCase(fetchProducts.rejected,(state,action)=>{
            state.error=action.payload || action.payload.message || "Error while fetching Products"
            state.pending=false;
            state.products=[]
        });
        builder.addCase(fetchProducts.fulfilled,(state,action)=>{
            state.products=action.payload;
            state.pending=false;
            state.error=null
        })
    }
})

export const {fetchAllProducts}=productSlice.actions;
export default productSlice.reducer;