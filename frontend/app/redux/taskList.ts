import {createSlice} from "@reduxjs/toolkit";
import {TaskModel} from "../../models/TaskModel"

interface taskListState{
  value: TaskModel[]
}

const initialState: taskListState= {value:[]}

const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers:{
    setTaskList: (state, action) => {
      state.value = action.payload
    }
  }
})

export const {setTaskList} = taskListSlice.actions
export default taskListSlice.reducer