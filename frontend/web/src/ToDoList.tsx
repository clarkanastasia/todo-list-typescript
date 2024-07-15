import { FormEvent, useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskModel} from '../../models/TaskModel'
import { CreateTaskModel } from "../../models/CreateTaskModel";
import { UpdateTaskModel } from "../../models/UpdateTaskModel";
import {getTasksRequest, addTaskRequest, removeTaskRequest, updateTaskRequest} from "../../api/backendClient"
import {getDayOfWeek, getFullDate} from "../../api/dateClient"

const ToDoList = () => {

  const [tasks, setTasks] = useState<TaskModel[]>([{id: 0, name: "coding"}]);
  const [checkedState, setCheckedState] = useState(new Array(tasks.length).fill(false));
  const [newTask, setNewTask] = useState<CreateTaskModel>({name : ''});
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editText, setEditText] = useState<UpdateTaskModel>({name: ''});

  useEffect(() => {
    getData()
    }, [])

  const getData = () => {
    getTasksRequest()
    .then(response => response.json())
    .then(data => setTasks(data));
  }  

  const addTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTaskRequest(newTask)
    .then(response => response.json())
    .catch(error => console.log(error))
    .finally(() => {
      getData()
      setNewTask({name: ""})
    })
  }

  const removeTask = (id: number) => {
    removeTaskRequest(id)
    .catch(error => console.log(error))
    .finally(() => getData())
  }

  const updateTask = (id: number) => {
      updateTaskRequest(id, editText)
      .catch(error => console.log(error))
      .finally(() => {
        setIsEditing(null);
        setEditText({name: ''})
        getData();
      })
  }

  const handleEdit = (index: number) => {
    setIsEditing(index);
    setEditText({name: tasks[index].name});
};

  const handleCheckboxChange = (index: number) => {
    const updatedCheckedState = checkedState.map((item, idx) => 
      idx === index ? !item : item
  );
    setCheckedState(updatedCheckedState);
};

  return(
    <div className="main">
      <div className="background" >
        <div className="interface">
          <div className="heading">
            <div className="leftColumn">
              <h3>{getDayOfWeek()}</h3>
              <h4>{getFullDate()}</h4>
            </div>
            <div className="rightColumn">
              <p>{`${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'}`}</p>
            </div>
          </div>
          <div className="tasks">
            {tasks.map((task, index) => 
            <div key={task.id} className={`checkBox ${checkedState[index] ? 'checked' : ''}`}>
                <input 
                type="checkbox" 
                id={`task-${task.id}`} 
                name={task.name} 
                value={task.name} 
                onChange={() => handleCheckboxChange(index)} 
                checked={checkedState[index]}
                />
                {isEditing === index ? (
                        <input
                            type="text"
                            value={editText.name}
                            onChange={(e) => setEditText({name: e.target.value})}
                        />
                    ) : (
                      <label htmlFor={`task-${task.id}`}>{task.name}</label>
                    )}
                {isEditing === index ? (
                        <button onClick={() => updateTask(task.id)}>Update</button>
                    ) : ( <div>
                      <EditIcon onClick={() => handleEdit(index)} />
                      <DeleteIcon onClick={()=> removeTask(task.id)} />
                    </div>)}
            </div> 
            )}
          </div>
          <div className="addTask">
                <form onSubmit={addTask}>
                  <input 
                    type="text" 
                    name="newTask" 
                    value={newTask.name} 
                    onChange={(event)=> setNewTask({name: event?.target.value})} 
                  />
                  <button type="submit">Add</button>
                </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToDoList