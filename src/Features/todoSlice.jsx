import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");
const headers = { Authorization: `Bearer ${token}` };


export const getTasks = createAsyncThunk("todo/getTodos", async () => {
  const response = await axios.get("http://localhost:4000/todos", { headers });
  return response.data;
});

export const deleteTask = createAsyncThunk("todo/deleteTodo", async (taskId) => {
  const response = await axios.delete(`http://localhost:4000/todos/${taskId}`, { headers })
  return response.data
})

export const AddTask = createAsyncThunk("task/addTask", async (task) => {
  const userId = Number(window.localStorage.getItem("id"));
  const owner = userId;
  const newTask = { userId, owner, ...task };
  const response = await axios.post(
    "http://localhost:4000/todos",
    {
      userId: newTask.userId,
      owner: newTask.owner,
      title: newTask.title,
      description: newTask.description,
      date: (newTask.date),
      done: newTask.done,
    },
    {
      headers
    }
  );
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
      .addCase(getTasks?.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getTasks?.fulfilled, (state, action) => {
        state.tasks = action.payload;
        console.log(action);
        state.loading = false;
      })
      .addCase(getTasks?.rejected, (state, action) => {
        state.loading = false
        alert(action?.error.name);
      })
      .addCase(deleteTask?.fulfilled, (state,action) =>{
        state.loading = false;
        state.tasks = action.payload;
        alert("task deleted succeessfully")

      })
      .addCase(deleteTask?.pending, (state,action) =>{
        state.loading = true;
      })
      .addCase(deleteTask?.rejected, (state,action) =>{
        alert(action);
      })
      .addCase(AddTask?.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(AddTask?.fulfilled, (state, action) => {
        //action.payload = {...action.payload,date : action.payload.date*1000}
        state.tasks = action.payload;
        //state.tasks = [...state.tasks,state.tasks.date*1000]
        state.loading = false;
      })
      .addCase(AddTask?.rejected, (state, action) => {
        alert(action);
      })
  },
});

export default todoSlice.reducer;
