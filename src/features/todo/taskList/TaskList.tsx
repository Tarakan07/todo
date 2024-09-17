import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useTask} from '../_contexts/TaskProvider/TaskProvider';
import TaskItem from './taskItem/TaskItem';
const TaskList = () => {
  const {todo} = useTask();

  if (!todo.length) return <Text>Empty...</Text>;
  return (
    <View style={styles.container}>
      <FlatList
        data={todo}
        keyExtractor={e => `${e.id}`}
        renderItem={({item}) => {
          return <TaskItem {...item} />;
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {},
});
export default TaskList;
