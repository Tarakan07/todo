import React, {FC} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {TKeyFieldNewTodo} from '../type';
import {TParamsHandleChange} from './type';
type TProps = {
  value: string;
  label: TKeyFieldNewTodo;
  handleChange: (params: TParamsHandleChange) => void;
};
const TaskInput: FC<TProps> = ({value, label, handleChange}) => {
  return (
    <View style={styles.boxInput}>
      <Text>{label}:</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={e => {
          handleChange({
            key: label,
            value: e,
          });
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  boxInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  input: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderColor: '#000',
    borderWidth: 1,
    flex: 1,
  },
});
export default TaskInput;
