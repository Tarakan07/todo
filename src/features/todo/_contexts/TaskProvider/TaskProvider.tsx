import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  TChangeCompleted,
  TChangeTodo,
  TFilterKey,
  TNewTodo,
  TRemoveTodo,
  TTodo,
} from '../../type';
import AsyncStorage from '@react-native-async-storage/async-storage';
type TTaskContext = {
  todo: TTodo[];
  addNewTask: (params: TNewTodo) => void;
  removeTask: (params: TRemoveTodo) => void;
  changeTask: (params: TChangeTodo) => void;
  changeTaskCompleted: (params: TChangeCompleted) => void;
  _filter: {
    activeKey: TFilterKey;
    updateFilter: (params: TFilterKey) => void;
  };
};

const TaskContext = createContext<TTaskContext | undefined>(undefined);

export const TaskProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [todo, setTodo] = useState<TTodo[]>([]);
  const [filter, setFilter] = useState<TFilterKey>('all');
  const [visibleTodo, setVisibleTodo] = useState<TTodo[]>([]);
  ////
  const findElement = (id: string) => todo.findIndex(e => e.id === id);

  const updateFilter = (key: TFilterKey) => setFilter(key);

  const addNewTask = async (params: TNewTodo) => {
    const newTodoList = [
      ...todo,
      {...params, isCompleted: false, id: JSON.stringify(new Date())},
    ];
    try {
      await AsyncStorage.setItem('@task/todo', JSON.stringify(newTodoList));
    } catch (error) {}
    setTodo(newTodoList);
  };
  const removeTask = async ({id}: TRemoveTodo) => {
    const findInd = findElement(id);
    const newTodoList = [...todo.slice(0, findInd), ...todo.slice(findInd + 1)];

    try {
      await AsyncStorage.removeItem('@task/todo');
    } catch (error) {}

    setTodo(newTodoList);
  };

  const changeTask = async (params: TChangeTodo) => {
    const findInd = findElement(params.id);
    const newTodoList = [
      ...todo.slice(0, findInd),
      {...todo[findInd], ...params},
      ...todo.slice(findInd + 1),
    ];
    try {
      await AsyncStorage.setItem('@task/todo', JSON.stringify(newTodoList));
    } catch (error) {}

    setTodo(newTodoList);
  };
  const changeTaskCompleted = async (params: TChangeCompleted) => {
    const findInd = findElement(params.id);
    const newTodoList = [
      ...todo.slice(0, findInd),
      {...todo[findInd], isCompleted: !todo[findInd].isCompleted},
      ...todo.slice(findInd + 1),
    ];
    try {
      await AsyncStorage.setItem('@task/todo', JSON.stringify(newTodoList));
    } catch (error) {}

    setTodo(newTodoList);
  };
  ////
  useEffect(() => {
    const getSavedTodo = async () => {
      try {
        const value = await AsyncStorage.getItem('@task/todo');
        if (value) {
          return value ? JSON.parse(value) : [];
        } else {
          AsyncStorage.setItem('@task/todo', JSON.stringify([]));
          return [];
        }
      } catch (e) {
        return [];
      }
    };
    getSavedTodo().then(e => setTodo(e));
  }, []);
  useEffect(() => {
    if (filter === 'all') setVisibleTodo(todo);
    if (filter === 'completed') {
      const filterList = todo.filter(e => e.isCompleted);
      setVisibleTodo(filterList);
    }
  }, [todo, filter]);
  return (
    <TaskContext.Provider
      value={{
        todo: visibleTodo,
        addNewTask,
        removeTask,
        changeTask,
        changeTaskCompleted,
        _filter: {
          activeKey: filter,
          updateFilter,
        },
      }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);

  if (context === undefined) {
    throw new Error('Context is missing');
  }
  return context;
};
