import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Header from './components/header';
import TaskManager from './components/taskmanager';

export default function App() {
  return (
    <View style={styles.container}>
      <Header/>
      <TaskManager/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
