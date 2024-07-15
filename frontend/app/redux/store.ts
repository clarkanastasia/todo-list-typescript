import { configureStore } from "@reduxjs/toolkit";
import newTaskReducer from './newTask'
import taskListReducer from "./taskList";

export const store = configureStore({
  reducer: {
    newTask: newTaskReducer,
    taskList: taskListReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
