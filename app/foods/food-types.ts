export interface IFoodState {
    readonly foods: IFoodModel[];
    readonly food: IFoodModel;
    readonly isLoading: boolean;
    readonly error: string;
}

export type ApiResponse = Record<string, any>;

export interface IFoodModel extends ApiResponse {
    id: string;
    name: string;
}

/* action types */
export const FoodActionTypes = {
    FETCH_FOODS_REQUEST: '@@/food/FETCH_FOODS_REQUEST',
    FETCH_FOODS_SUCCESS: '@@/food/FETCH_FOODS_SUCCESS',
    FETCH_FOODS_FAIL: '@@/food/FETCH_FOODS_FAIL',

    REMOVE_FOOD_REQUEST: '@@/food/REMOVE_FOOD_REQUEST',
    REMOVE_FOOD_SUCCESS: '@@/food/REMOVE_FOOD_SUCCESS',
    REMOVE_FOOD_FAIL: '@@/food/REMOVE_FOOD_FAIL',

    ADD_FOOD_REQUEST: '@@/food/ADD_FOOD_REQUEST',
    ADD_FOOD_SUCCESS: '@@/food/ADD_FOOD_SUCCESS',
    ADD_FOOD_FAIL: '@@/food/ADD_FOOD_FAIL',

    UPDATE_FOOD_REQUEST: '@@/food/UPDATE_FOOD_REQUEST',
    UPDATE_FOOD_SUCCESS: '@@/food/UPDATE_FOOD_SUCCESS',
    UPDATE_FOOD_FAIL: '@@/food/UPDATE_FOOD_FAIL',
};
