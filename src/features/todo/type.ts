type TFilterKey = 'all' | 'completed';
type TFilterState = {
  key: TFilterKey;
  label: string;
  isActive: boolean;
};
//

type TTodo = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
};
type TChangeTodo = TTodo;
type TChangeCompleted = {
  id: string;
};
type TNewTodo = {
  title: string;
  description: string;
};
type TRemoveTodo = {
  id: string;
};
type TKeyFieldNewTodo = keyof TNewTodo;
export type {
  TFilterKey,
  TFilterState,
  TTodo,
  TNewTodo,
  TChangeTodo,
  TChangeCompleted,
  TRemoveTodo,
  TKeyFieldNewTodo,
};
