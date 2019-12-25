import {put, takeEvery, call} from 'redux-saga/effects';
import {all} from '@redux-saga/core/effects';
import {getTodos, deleteTodo, postTodo, putTodo} from './todo-service';
import {
 TodoActionTypes
} from './todo-types';

/*function generator implementations of Saga */
function* fetchingTodos() {
  try {
    const {data} = yield call(getTodos); // saga
    yield put({type:  TodoActionTypes.FETCH_TODOS_SUCCESS, payload: data});
  } catch (e) {
    console.log(e.message);
    yield put({
      type:  TodoActionTypes.FETCH_TODOS_FAIL,
      payload: e.message,
    });
  }
}

function* removingTodo({payload: id}: any) {
  try {
    yield call(deleteTodo, id);
    yield put({type:  TodoActionTypes.REMOVE_TODO_SUCCESS, payload: id});
  } catch (e) {
    console.log(e.message);
    yield put({
      type:  TodoActionTypes.REMOVE_TODO_FAIL,
      payload: e.message,
    });
  }
}

function* addingTodo({payload: newTodo}: any) {
  try {
    const {data} = yield call(postTodo, newTodo);
    yield put({type:  TodoActionTypes.ADD_TODO_SUCCESS, payload: data});
  } catch (e) {
    console.log(e.message);
    yield put({type:  TodoActionTypes.ADD_TODO_FAIL, payload: e.message});
  }
}

function* updatingTodo({payload: updatedTodo}: any) {
  try {
    yield call(putTodo, updatedTodo);
    yield put({type:  TodoActionTypes.UPDATE_TODO_SUCCESS, payload: updatedTodo});
  } catch (e) {
    yield put({
      type:  TodoActionTypes.UPDATE_TODO_FAIL,
      payload: e.message,
    });
  }
}

/* Saga watchers the actions */
function* watchFetchingTodos() {
  yield takeEvery(TodoActionTypes.FETCH_TODOS_REQUEST, fetchingTodos);
}

function* watchRemovingTodo() {
  yield takeEvery( TodoActionTypes.REMOVE_TODO_REQUEST, removingTodo);
}

function* watchAddingTodo() {
  yield takeEvery( TodoActionTypes.ADD_TODO_REQUEST, addingTodo);
}
function* watchUpdatingTodo() {
  yield takeEvery( TodoActionTypes.UPDATE_TODO_REQUEST, updatingTodo);
}

/* Saga sends all the watchers to the sagaMiddleware to run. */
export function* todoSaga() {
  yield all([
    watchFetchingTodos(),
    watchRemovingTodo(),
    watchAddingTodo(),
    watchUpdatingTodo(),
  ]);
}
