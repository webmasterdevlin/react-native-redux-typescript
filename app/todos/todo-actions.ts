/* action creators of Saga */
import {
  ITodoModel,
  TodoActionTypes
} from './todo-types';
import { Action } from "redux";

interface IAction extends Action {
 readonly payload?: any
}

export const fetchTodos = (): IAction => ({
  type:  TodoActionTypes.FETCH_TODOS_REQUEST,
});

export const removeTodo = (id: string): IAction => ({
  type:  TodoActionTypes.REMOVE_TODO_REQUEST,
  payload: id,
});

export const addTodo = (todo: ITodoModel): IAction => ({
  type:  TodoActionTypes.ADD_TODO_REQUEST,
  payload: todo,
});

export const updateTodo = (todo: ITodoModel) => ({
  type:  TodoActionTypes.UPDATE_TODO_REQUEST,
  payload: todo,
});
