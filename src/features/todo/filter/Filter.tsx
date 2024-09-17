import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTask} from '../_contexts/TaskProvider/TaskProvider';
import FilterItem from './FilterItem';
import {TFilterState} from '../type';

const Filter = () => {
  const [filter, setFilter] = useState<TFilterState[]>([
    {
      key: 'all',
      isActive: true,
      label: 'All',
    },
    {
      key: 'completed',
      isActive: false,
      label: 'Completed',
    },
  ]);
  const {
    _filter: {activeKey, updateFilter},
  } = useTask();
  useEffect(() => {
    setFilter(prev => {
      const findInd = prev.findIndex(e => e.key === activeKey);
      if (prev[findInd].isActive) return prev;
      const clearActive = prev.map(e => ({...e, isActive: false}));
      return [
        ...clearActive.slice(0, findInd),
        {...clearActive[findInd], isActive: true},
        ...clearActive.slice(findInd + 1),
      ];
    });
  }, [activeKey]);
  return (
    <View style={styles.container}>
      {filter.map(item => {
        return <FilterItem key={item.key} {...{updateFilter, item}} />;
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
export default Filter;
