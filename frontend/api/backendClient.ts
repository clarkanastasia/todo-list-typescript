import { CreateTaskModel } from "../models/CreateTaskModel"
import { UpdateTaskModel } from "../models/UpdateTaskModel"

export const getTasksRequest = () => {
  return fetch('http://localhost:3000/')
}

export const addTaskRequest = (newTask : CreateTaskModel) => {
  return fetch('http://localhost:3000/add', {
    method: 'POST',
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTask)
  })
}

export const removeTaskRequest = (id : number) => {
  return fetch(`http://localhost:3000/delete/${id}`, {
    method: 'DELETE'})
}

export const updateTaskRequest = (id: number, editText: UpdateTaskModel) => {
  return fetch(`http://localhost:3000/update/${id}`, {
    method: 'PUT',
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(editText)})
}