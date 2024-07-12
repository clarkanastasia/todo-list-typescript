import { createSlice } from "@reduxjs/toolkit";

interface newTaskState {
  value: {name: string}
}

const initialState: newTaskState = {value: {name: ""}}

const newTaskSlice = createSlice({
  name: "newTask",
  initialState,
  reducers: {
    setNewTask: (state, action) => {
      state.value = {name: action.payload}
    },
    clearNewTask(state) {
      state.value = { name: "" };
    },
  }
})

export const {setNewTask, clearNewTask} = newTaskSlice.actions
export default newTaskSlice.reducer