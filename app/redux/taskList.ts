import {createSlice} from "@reduxjs/toolkit";

interface taskListState{
  value: string[]
}

const initialState: taskListState= {value:["coding", "laundry", "cleaning"]}

const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers:{
    add: (state, action) => {
      state.value.push(action.payload)
    }
  }
})

export const {add} = taskListSlice.actions
export default taskListSlice.reducer