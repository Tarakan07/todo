import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTask} from '../../_contexts/TaskProvider/TaskProvider';
import {TParamsHandleChange} from '../../newTask/type';
import {TChangeTodo, TTodo} from '../../type';
type TProps = {
  isEdit: boolean;
  itemTodo: TTodo;
  updateEdit: () => void;
};
const TaskBody: FC<TProps> = ({isEdit, itemTodo, updateEdit}) => {
  const [stateForm, setStateForm] = useState<TChangeTodo>(itemTodo);
  const {changeTask} = useTask();
  ///
  const handleChangeStateForm = (params: TParamsHandleChange) =>
    setStateForm(prev => ({...prev, [params.key]: params.value}));
  return (
    <View style={styles.container}>
      <TextInput
        editable={isEdit}
        style={{...styles.input, ...(isEdit ? styles.edit : {})}}
        value={stateForm.title}
        onChangeText={e => {
          handleChangeStateForm({key: 'title', value: e});
        }}
      />
      <TextInput
        editable={isEdit}
        style={{...styles.input, ...(isEdit ? styles.edit : {})}}
        value={stateForm.description}
        onChangeText={e => {
          handleChangeStateForm({key: 'description', value: e});
        }}
      />
      {isEdit && (
        <TouchableOpacity
          disabled={
            stateForm.title.length < 1 || stateForm.description.length < 1
          }
          onPress={() => {
            changeTask(stateForm);
            updateEdit();
          }}>
          <Text style={{color: 'blue'}}>Save</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    gap: 2,
    flex: 1,
  },
  input: {
    paddingVertical: 1,
  },
  edit: {
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
  },
});
export default TaskBody;
