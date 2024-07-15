import { createSlice } from "@reduxjs/toolkit";
import {CreateTaskModel} from "../../models/CreateTaskModel"

interface newTaskState {
  value: CreateTaskModel
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