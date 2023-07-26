import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTasks = createAsyncThunk("todo/getTodos", async () => {
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };
  const response = await axios.get("http://localhost:4000/todos", { headers });
  return response.data;
});

export const todoSlice = createSlice({
  name: "todoSlice",
  initialState: {
    loading: false,
    tasks: [],
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        console.log(action);
        state.loading = false;
      })
      .addCase(getTasks.rejected, (state, action) => {
        alert(action);
      });
  },
});

export default todoSlice.reducer;
