import axios from 'axios';
import {BaseUrl} from '../api-config';
import {IFoodModel} from "./food-types";

export async function getFoods() {
  return await axios.get(BaseUrl.foods);
}

export async function deleteFood(id: string) {
  return await axios.delete(`${BaseUrl.foods}${id}`);
}

export async function postFood(newFood: IFoodModel) {
  return await axios.post(BaseUrl.foods, newFood);
}

export async function putFood(updateFood: IFoodModel) {
  return await axios.put(`${BaseUrl.foods}${updateFood.id}`, updateFood);
}
