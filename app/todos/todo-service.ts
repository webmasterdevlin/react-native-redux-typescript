import {api} from '../api-config';
import {ITodoModel} from './todo-types';

export async function getTodos() {
  return await api.get('todos');
}

export async function deleteTodo(id: string) {
  return await api.delete('todos/' + id);
}

export async function postTodo(newTodo: ITodoModel) {
  return await api.post('todos', newTodo);
}

export async function putTodo(updateTodo: ITodoModel) {
  return await api.put(`todos/${updateTodo.id}`, updateTodo);
}
