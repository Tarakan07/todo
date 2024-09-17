import React, {FC, memo} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {TFilterKey, TFilterState} from '../type';
type TProps = {
  item: TFilterState;
  updateFilter: (params: TFilterKey) => void;
};
const FilterItem: FC<TProps> = memo(({item, updateFilter}) => {
  const {label, isActive} = item;
  return (
    <TouchableOpacity
      style={{
        backgroundColor: isActive ? 'blue' : 'transparent',
        ...styles.container,
      }}
      onPress={() => {
        updateFilter(item.key);
      }}>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
});
const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
});
export default FilterItem;
