import {createSlice} from "@reduxjs/toolkit";

export interface TaskModel {
  id: number, 
  name: string,
}

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