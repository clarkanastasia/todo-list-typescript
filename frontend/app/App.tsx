import { StyleSheet, View } from 'react-native';
import ToDoList from './ToDoListMobile';
import { Provider } from 'react-redux';
import { store } from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
    <View style={styles.container}>
      <ToDoList />
    </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
});
