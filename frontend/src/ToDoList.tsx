import { FormEvent, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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

  const [tasks, setTasks] = useState<string[]>(["coding"]);
  const [checkedState, setCheckedState] = useState(new Array(tasks.length).fill(false));
  const [newTask, setNewTask] = useState<string>("");

  const addTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTasks([...tasks, newTask]);
    setNewTask("");
  }

  const removeTask = (index: number) => {
    const updatedList = tasks.filter((_, idx) => idx !== index );
    setTasks(updatedList);
  }

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
                name={task} value={task} 
                onChange={() => handleCheckboxChange(index)} 
                checked={checkedState[index]}/>
                {task}
              </label>
              <div>
                <EditIcon />
                <DeleteIcon onClick={() =>removeTask(index)}/>
              </div>
            </div> 
            )}
          </div>
          <div className="addTask">
                <form onSubmit={addTask}>
                  <input 
                    type="text" 
                    name="newTask" 
                    value={newTask} 
                    onChange={(event)=> setNewTask(event?.target.value)} 
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