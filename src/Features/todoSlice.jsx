import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';
/*const token = localStorage.getItem("token");
const headers = { Authorization: `Bearer ${token}` };*/

export const getTasks = createAsyncThunk("todo/getTodos", async () => {
  try{
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get("http://localhost:4000/todos", { headers });
    return response.data;
  }catch(error){
    //alert(`${error?.response?.data} please log in again`)
    toast.error(`${error?.response?.data} please log in again`, {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
    localStorage.clear()
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

export const doneTask = createAsyncThunk(
  "task/doneTask",
  async (task) => {
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
      return response.data;
    } catch (error) {
      //alert(error?.response?.data)
      toast.error(error?.response?.data, {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      console.log(error?.response?.data);
    }
  }
);

export const AddTask = createAsyncThunk("task/addTask", async (task) => {
  try{
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const userId = Number(localStorage.getItem("id"));
      const owner = userId;
      const newTask = { userId, owner, ...task };
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

    }catch(error){
      console.log(error?.response);
      //alert(error?.response)
      toast.error(error?.response?.data, {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
  //return response.data;
});

export const todoSlice = createSlice({
  name: "todoSlice",
  initialState: {
    loading: false,
    tasks: [],
    openedTasks : [],
    closedTasks : [],
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
        state.openedTasks = action.payload.filter((task) => !task.done)
        state.closedTasks= action.payload.filter((task) => task.done)
        state.openedCount = action.payload.filter((task) => !task.done).length;
        state.closedCount = action.payload.filter((task) => task.done).length;
        console.log(action);
        state.loading = false;
      })
      .addCase(getTasks?.rejected, (state, action) => {
        state.loading = false;
        alert(action?.error.name);
        console.log(action?.error.name);
      })
      .addCase(deleteTask?.fulfilled, (state, action) => {
        state.loading = false;
        state.openedTasks = action.payload.filter((task) => !task.done)
        state.closedTasks= action.payload.filter((task) => task.done)
        state.openedCount = state.tasks.filter((task) => !task.done).length;
        state.closedCount = state.tasks.filter((task) => task.done).length;
        //state.tasks = action.payload;
        //alert("task deleted succeessfully");
        toast.success("task deleted succeessfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      })
      .addCase(deleteTask?.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteTask?.rejected, (state, action) => {
        alert(action);
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
      .addCase(doneTask.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(doneTask.fulfilled, (state, action) => {
        /*if(state.tasks.id === action.payload){
          state.tasks.done = !state.tasks.done
        }*/
        state.openedTasks = action.payload.filter((task) => !task.done)
        state.closedTasks= action.payload.filter((task) => task.done)
        state.openedCount = state.tasks.filter((task) => !task.done).length;
        state.closedCount = state.tasks.filter((task) => task.done).length;
        const taskId = action.payload.id;
        const taskToUpdate = state.tasks.find((task) => task.id === taskId);
        if (taskToUpdate) {
          taskToUpdate.done = !taskToUpdate.done;
        }
        state.loading = false;
        state.loading = false;
      })
      .addCase(doneTask.rejected, (state, action) => {
        state.loading = false;
        console.log(action);
      });
  },
});

export default todoSlice.reducer;
