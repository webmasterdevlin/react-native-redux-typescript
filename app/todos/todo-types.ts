export interface ITodoState {
  readonly todos: ITodoModel[];
  readonly todo: ITodoModel;
  readonly isLoading: boolean;
  readonly error: string;
  readonly logo: string;
}

export type ApiResponse = Record<string, any>;

export interface ITodoModel extends ApiResponse {
  id: string;
  title: string;
}

/* action types */
export const TodoActionTypes = {
  FETCH_TODOS_REQUEST: '@@/todo/FETCH_TODOS_REQUEST',
  FETCH_TODOS_SUCCESS: '@@/todo/FETCH_TODOS_SUCCESS',
  FETCH_TODOS_FAIL: '@@/todo/FETCH_TODOS_FAIL',

  REMOVE_TODO_REQUEST: '@@/todo/REMOVE_TODO_REQUEST',
  REMOVE_TODO_SUCCESS: '@@/todo/REMOVE_TODO_SUCCESS',
  REMOVE_TODO_FAIL: '@@/todo/REMOVE_TODO_FAIL',

  ADD_TODO_REQUEST: '@@/todo/ADD_TODO_REQUEST',
  ADD_TODO_SUCCESS: '@@/todo/ADD_TODO_SUCCESS',
  ADD_TODO_FAIL: '@@/todo/ADD_TODO_FAIL',

  UPDATE_TODO_REQUEST: '@@/todo/UPDATE_TODO_REQUEST',
  UPDATE_TODO_SUCCESS: '@@/todo/UPDATE_TODO_SUCCESS',
  UPDATE_TODO_FAIL: '@@/todo/UPDATE_TODO_FAIL',
};
