import {api} from '../api-config';
import {IFoodModel} from './food-types';

export async function getFoods() {
  return await api.get<IFoodModel[]>('foods');
}

export async function deleteFood(id: string) {
  return await api.delete<void>('foods/' + id);
}

export async function postFood(newFood: IFoodModel) {
  return await api.post<IFoodModel>('foods', newFood);
}

export async function putFood(updateFood: IFoodModel) {
  return await api.put<void>(`foods/${updateFood.id}`, updateFood);
}
