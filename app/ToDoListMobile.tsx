import { View, Text, TextInput, Button, FlatList, StyleSheet} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { setNewTask, clearNewTask } from "./redux/newTask";
import { add } from "./redux/taskList";

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

export default function App() {

  const tasks = useSelector((state: RootState) => state.taskList.value)
  const newTask = useSelector((state: RootState) => state.newTask.value)
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <Text style={styles.subtitle}>{getDayOfWeek()}, {getFullDate()}</Text>
      <Text style={styles.subtitle}>You have {tasks.length} tasks today</Text>

    <View>
      <FlatList 
        data={tasks}
        renderItem={({item, index}) =>
        <BouncyCheckbox 
        key={index}
        text={item}
        />}
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
      onPress={() => {
        dispatch(add(newTask.name));
        dispatch(clearNewTask());
      }
      }
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
  checkbox: {
    marginBottom: 10,
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
