import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import WrapperTodo from './src/features/todo/WrapperTodo';
import {TaskProvider} from './src/features/todo/_contexts/TaskProvider/TaskProvider';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <TaskProvider>
        <WrapperTodo />
      </TaskProvider>
    </GestureHandlerRootView>
  );
}

export default App;
