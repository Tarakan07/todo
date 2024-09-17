import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTask} from '../_contexts/TaskProvider/TaskProvider';
import {TNewTodo} from '../type';
import SentTask from './comp/SentTask';
import {TParamsHandleChange} from './type';
import TaskInput from './comp/TaskInput';
const INIT_STATE = {
  title: '',
  description: '',
};
const NewTask = () => {
  const [stateForm, setStateForm] = useState<TNewTodo>(INIT_STATE);
  const {addNewTask} = useTask();
  ///
  const handleChangeStateForm = useCallback(
    (params: TParamsHandleChange) =>
      setStateForm(prev => ({...prev, [params.key]: params.value})),
    [],
  );
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TaskInput
          value={stateForm.title}
          handleChange={handleChangeStateForm}
          label={'title'}
        />
        <TaskInput
          value={stateForm.description}
          handleChange={handleChangeStateForm}
          label={'description'}
        />
      </View>
      <SentTask
        isDisabled={
          stateForm.description.length < 1 || stateForm.title.length < 1
        }
        handleSent={() => {
          addNewTask(stateForm);
          setStateForm(INIT_STATE);
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {justifyContent: 'center', gap: 24},
  form: {
    gap: 8,
  },
  boxInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
export default NewTask;
