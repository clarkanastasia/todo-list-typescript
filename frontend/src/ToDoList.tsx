import { FormEvent, useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskModel} from './models/TaskModel'
import { CreateTaskModel } from "./models/CreateTaskModel";

const getDayOfWeek = () => {
  const date = new Date();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return dayNames[date.getDay()];
};

const getFullDate = () => {
  const date = new Date();
  const day = date.getDate();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const ToDoList = () => {

  const [tasks, setTasks] = useState<TaskModel[]>([{id: 0, name: "coding"}]);
  const [checkedState, setCheckedState] = useState(new Array(tasks.length).fill(false));
  const [newTask, setNewTask] = useState<CreateTaskModel>({name : ''});

  useEffect(() => {
    getData()
    }, [])

  const getData = () => {
    fetch('http://localhost:3000/')
    .then(response => response.json())
    .then(data => setTasks(data));
  }  

  const addTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch('http://localhost:3000/add', {
      method: 'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask)
    })
    .then(response => response.json())
    .catch(error => console.log(error))
    .finally(() => {
      getData()
      setNewTask({name: ""})
    })
  }

  // const removeTask = (index: number) => {
  //   const updatedList = tasks.filter((_, idx) => idx !== index );
  //   setTasks(updatedList);
  // }

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
            <div key={index} className={`checkBox ${checkedState[index] ? 'checked' : ''}`}>
              <label>
                <input 
                type="checkbox" 
                id={`task-${index}`} 
                name={task.name} value={task.name} 
                onChange={() => handleCheckboxChange(index)} 
                checked={checkedState[index]}/>
                {task.name}
              </label>
              <div>
                <EditIcon />
                <DeleteIcon/>
              </div>
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