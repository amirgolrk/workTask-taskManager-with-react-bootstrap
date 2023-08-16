/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toaster from "../helpers/toaster";
export const getTasks = createAsyncThunk("todo/getTodos", async (action) => {
  try {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get("http://localhost:4000/todos", {
      headers,
    });
    return response.data;
  } catch (error) {
    //alert(`${error?.response?.data} please log in again`)
    toaster(`${error?.message}`,"error",3000)
    //localStorage.clear()
    if (error?.response?.data === "jwt expired") {
      action?.onFail();
      localStorage.clear()
    }
  }
});

export const deleteTask = createAsyncThunk(
  "todo/deleteTodo",
  async (taskId) => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.delete(
      `http://localhost:4000/todos/${taskId}`,
      { headers }
    );
    return response.data;
  }
);

export const doneTask = createAsyncThunk("task/doneTask", async (task) => {
  try {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.patch(
      `http://localhost:4000/todos/${task.id}`,
      { done: !task.done },
      {
        headers,
      }
    );
    await toaster("Task done status edited successfully","success",3000)
    return response.data;
  } catch (error) {
    //alert(error?.response?.data)
    toaster(error?.response?.data,"error",3000)
    console.log(error?.response?.data);
  }
});

export const AddTask = createAsyncThunk("task/addTask", async (payload) => {
  try {
    console.log(payload);
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    const userId = Number(localStorage.getItem("id"));
    const owner = userId;
    const newTask = { userId, owner, ...payload.newTaskData };
    await axios.post(
      "http://localhost:4000/todos",
      {
        userId: newTask.userId,
        owner: newTask.owner,
        title: newTask.title,
        description: newTask.description,
        date: newTask.date,
        done: newTask.done,
      },
      {
        headers,
      }
    );
  } catch (error) {
    console.log(error?.response);
    //alert(error?.response)
    toaster(`${error?.message}`,"error",3000)
    if (error?.response?.data === "jwt expired") {
      payload.onFail();
      localStorage.clear()
    }
  }
  //return response.data;
});

export const todoSlice = createSlice({
  name: "todoSlice",
  initialState: {
    loading: false,
    tasks: [],
    openedTasks: [],
    closedTasks: [],
    openedCount: 0,
    closedCount: 0,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getTasks?.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getTasks?.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.openedTasks = action.payload.filter((task) => !task.done);
        state.closedTasks = action.payload.filter((task) => task.done);
        state.openedCount = state.openedTasks.length;
        state.closedCount = state.closedTasks.length;
        console.log(action);
        state.loading = false;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        alert(action?.error.name);
        console.log(action?.error.name);
      })
      .addCase(deleteTask?.fulfilled, (state, action) => {
        state.loading = false;
        //state.openedTasks = action.payload.filter((task) => !task.done);
        //state.closedTasks = action.payload.filter((task) => task.done);
        state.openedCount = state.openedTasks.length;
        state.closedCount = state.closedTasks.length;
        //state.tasks = action.payload;
        toaster("task deleted successfully","success",3000)
      })
      .addCase(deleteTask?.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteTask?.rejected, (state, action) => {
        toaster(action.error.message,"error",3000)
        console.log(action);
      })
      .addCase(AddTask?.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(AddTask?.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(AddTask?.rejected, (state, action) => {
        console.log(action);
        alert(action);
      })
      .addCase(doneTask?.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(doneTask?.fulfilled, (state, action) => {
        /*if(state.tasks.id === action.payload){
          state.tasks.done = !state.tasks.done
        }*/
        state.openedTasks = action.payload.filter((task) => !task.done);
        //state.closedTasks = action.payload.filter((task) => task.done);
        //state.openedCount = state.openedTasks.length;
        state.closedCount = state.closedTasks.length;
        const taskId = action.payload.id;
        const taskToUpdate = state.tasks.find((task) => task.id === taskId);
        if (taskToUpdate) {
          taskToUpdate.done = !taskToUpdate.done;
        }
        console.log("done fullfill");
        state.loading = false;
        state.loading = false;
      })
      .addCase(doneTask?.rejected, (state, action) => {
        state.loading = false;
        console.log(action);
      });
  },
});

export default todoSlice.reducer;
