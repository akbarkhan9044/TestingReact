import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`);

      if (!response.data) {
        return rejectWithValue(`Product ${id} was not found`);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message
        || error.message
        || `Error while fetching product ${id}`
      );
    }
  }
)
