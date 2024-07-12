import { View, Text, TextInput, Button, FlatList, StyleSheet} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { setNewTask, clearNewTask } from "./redux/newTask";
import { setTaskList } from "./redux/taskList";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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

interface UpdateTaskModel {
  name: string,
}
export default function App() {

  const tasks = useSelector((state: RootState) => state.taskList.value)
  const newTask = useSelector((state: RootState) => state.newTask.value)
  const dispatch = useDispatch();

  const [editText, setEditText] = useState<UpdateTaskModel>({name: ''});
  const [isEditing, setIsEditing] = useState<number | null>(null);

  useEffect(() => {
    getData()
    }, [])

  const getData = () => {
    fetch('http://localhost:3000/')
    .then(response => response.json())
    .then(data => dispatch(setTaskList(data)));
  }  

  const addTask = () => {
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
      dispatch(clearNewTask());
    })
  }

  const removeTask = (id: number) => {
    fetch(`http://localhost:3000/delete/${id}`, {
      method: 'DELETE'})
    .catch(error => console.log(error))
    .finally(() => getData())
  }

  const updateTask = (id: number) => {
    fetch(`http://localhost:3000/update/${id}`, {
      method: 'PUT',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editText)})
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

  return (
    <View style={styles.container}>

      <Text style={styles.title}>To-Do List</Text>
      <Text style={styles.subtitle}>{getDayOfWeek()}, {getFullDate()}</Text>
      <Text style={styles.subtitle}>You have {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} today</Text>

    <View style={styles.taskList}>
      <FlatList 
        data={tasks}
        renderItem={({item, index}) =>
          <View style={styles.checkbox}>
          {isEditing === index ? 
            (<TextInput 
              value={editText.name}
              onChangeText={input => setEditText({name: input})}
            />)
          :
            (<BouncyCheckbox 
              key={index}
              text={item.name}
              />)
          }
          {isEditing === index ? 
            (<Button
              title = "Update" 
              onPress={() => updateTask(item.id)}
              />)
          :
            (<View style={{flexDirection: 'row'}}>
              <EditIcon onClick={() => handleEdit(index)} />
              <DeleteIcon onClick={()=> removeTask(item.id)} />
            </View>)
          }
        </View>
        }
      />
      </View>

      <View style={styles.inputContainer}>
      <TextInput
        placeholder="Add a new task here"
        onChangeText={(input) => dispatch(setNewTask(input))}
        value={newTask.name}
        />
      <Button
        title="Add" 
        onPress={addTask}
      />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  taskList: {
    marginBottom: 10,
  },
  checkbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
});
