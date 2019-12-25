// @ts-ignore
import logger from 'redux-logger';
import {combineReducers, createStore, applyMiddleware, compose, Store} from 'redux';
import {todoReducer} from '../todos/todo-reducer';
import {foodReducer} from '../foods/food-reducer';
import {todoSaga} from '../todos/todo-saga';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import {ITodoState} from "../todos/todo-types";
import {IFoodState} from "../foods/food-types";


export interface IApplicationState {
  todoReducer: ITodoState;
  foodReducer: IFoodState;
}

const rootReducer = combineReducers<IApplicationState>({
  todoReducer: todoReducer,
  foodReducer: foodReducer,
});

// @ts-ignore
const withDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const middleware = [thunk, sagaMiddleware, logger]; // side-effect middleware
const store: Store<IApplicationState, any> = createStore(
  rootReducer,
  withDevTools(applyMiddleware(...middleware)),
);

sagaMiddleware.run(todoSaga);

export default store;


