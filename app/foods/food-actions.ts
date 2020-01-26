import {getFoods, deleteFood, putFood, postFood} from './food-service';
import {Dispatch, ActionCreator, Action} from 'redux';
import {IFoodModel, FoodActionTypes} from './food-types';
import {ThunkAction, ThunkDispatch} from 'redux-thunk'; // Too verbose to use. Any is good enough

/* action creators */
export const fetchFoods: ActionCreator<any> = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: FoodActionTypes.FETCH_FOODS_REQUEST,
    });

    try {
      const {data} = await getFoods();
      dispatch({type: FoodActionTypes.FETCH_FOODS_SUCCESS, payload: data});
    } catch (e) {
      dispatch({type: FoodActionTypes.FETCH_FOODS_FAIL, payload: e.message});
    }
  };
};

export const removeFood: ActionCreator<any> = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: FoodActionTypes.REMOVE_FOOD_REQUEST,
    });

    try {
      await deleteFood(id);
      dispatch({type: FoodActionTypes.REMOVE_FOOD_SUCCESS, payload: id});
    } catch (e) {
      dispatch({
        type: FoodActionTypes.REMOVE_FOOD_FAIL,
        payload: e.message,
      });
    }
  };
};

export const updateFood: ActionCreator<any> = (food: IFoodModel) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: FoodActionTypes.UPDATE_FOOD_REQUEST,
    });

    try {
      await putFood(food);
      dispatch({type: FoodActionTypes.UPDATE_FOOD_SUCCESS, payload: food});
    } catch (e) {
      dispatch({
        type: FoodActionTypes.UPDATE_FOOD_FAIL,
        payload: e.message,
      });
    }
  };
};

export const addFood: ActionCreator<any> = (food: IFoodModel) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: FoodActionTypes.ADD_FOOD_REQUEST,
    });

    try {
      const {data} = await postFood(food);
      dispatch({type: FoodActionTypes.ADD_FOOD_SUCCESS, payload: data});
    } catch (e) {
      dispatch({
        type: FoodActionTypes.ADD_FOOD_FAIL,
        payload: e.message,
      });
    }
  };
};
