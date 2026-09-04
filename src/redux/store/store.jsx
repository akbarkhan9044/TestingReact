import { configureStore } from "@reduxjs/toolkit";
import  productSlice from "../slice/productSlice";
import detailSlice  from "../slice/detailSlice";
import cartSlice  from "../slice/cartSlice";


export const store=configureStore({
    reducer:{
        products:productSlice,
        detail:detailSlice,
        cart:cartSlice
    }
})