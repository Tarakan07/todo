import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
type TProps = {
  isDisabled: boolean;
  handleSent: () => void;
};
const SentTask: FC<TProps> = ({handleSent, isDisabled}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          {...styles.btnSent, backgroundColor: isDisabled ? 'red' : '#fff'},
        ]}
        disabled={isDisabled}
        onPress={handleSent}>
        <Text>Add new</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btnSent: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
export default SentTask;
