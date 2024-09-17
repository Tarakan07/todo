import React, {FC, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTask} from '../../_contexts/TaskProvider/TaskProvider';
import {TTodo} from '../../type';
import TaskBody from './TaskBody';
const TaskItem: FC<TTodo> = itemTodo => {
  const [isEdit, setEdit] = useState(false);

  const {removeTask, changeTaskCompleted} = useTask();

  const updateEdit = () => setEdit(prev => !prev);
  return (
    <View style={styles.container}>
      {!isEdit && (
        <TouchableOpacity
          disabled={isEdit}
          onPress={() => changeTaskCompleted({id: itemTodo.id})}
          style={{
            backgroundColor: itemTodo.isCompleted ? 'red' : 'transparent',
            ...styles.btnEdit,
          }}
        />
      )}

      <TaskBody {...{isEdit, itemTodo, updateEdit}} />
      <View style={styles.boxSetting}>
        <TouchableOpacity onPress={() => removeTask({id: itemTodo.id})}>
          <Text>Remove</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setEdit(prev => !prev)}>
          <Text>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnEdit: {
    width: 16,
    height: 16,
    borderRadius: 100,
    borderWidth: 1,
  },
  boxSetting: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 4,
  },
});
export default TaskItem;
