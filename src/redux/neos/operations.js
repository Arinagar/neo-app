import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://api.nasa.gov/neo/rest/v1";
axios.defaults.api_key = "CznHZisDYfMkucbcWwQZnzoKJdwRuKXPuLqB7FeY";

export const fetchOneDayNeos = createAsyncThunk(
  "NEOs/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/feed");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
