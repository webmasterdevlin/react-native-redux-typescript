import {ITodoState, TodoActionTypes} from './todo-types';

const initialState: ITodoState = {
  todos: [
    {
      id: '',
      title: '',
    },
  ],
  todo: {
    id: '',
    title: '',
  },
  isLoading: false,
  error: '',
  logo: 'Logo from store',
};

interface IAction {
  type: string;
  payload: any;
}

export const todoReducer = (state: ITodoState = initialState, action: IAction): ITodoState => {
  switch (action.type) {
    case TodoActionTypes.FETCH_TODOS_REQUEST:
      return {...state, isLoading: true};
    case TodoActionTypes.FETCH_TODOS_SUCCESS:
      return {...state, isLoading: false, todos: action.payload};
    case TodoActionTypes.FETCH_TODOS_FAIL:
      return {...state, isLoading: false, error: action.payload};

    case TodoActionTypes.REMOVE_TODO_REQUEST:
      return {...state, isLoading: true};
    case TodoActionTypes.REMOVE_TODO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        todos: state.todos.filter(t => t.id !== action.payload),
      };
    case TodoActionTypes.REMOVE_TODO_FAIL:
      return {...state, isLoading: false, error: action.payload};

    case TodoActionTypes.ADD_TODO_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case TodoActionTypes.ADD_TODO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        todos: [...state.todos, action.payload],
      };
    case TodoActionTypes.ADD_TODO_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case TodoActionTypes.UPDATE_TODO_REQUEST:
      return {...state, isLoading: true};
    case TodoActionTypes.UPDATE_TODO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? action.payload : todo,
        ),
      };
    case TodoActionTypes.UPDATE_TODO_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
