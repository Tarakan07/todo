import React from 'react';
import {StyleSheet, View} from 'react-native';
import Filter from './filter';
import NewTask from './newTask';
import TaskList from './taskList';

const WrapperTodo = () => {
  return (
    <View style={styles.container}>
      <Filter />
      <TaskList />
      <NewTask />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 120,
    gap: 24,
  },
});
export default WrapperTodo;
