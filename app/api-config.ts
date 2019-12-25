
import {Platform} from 'react-native';

export const BaseUrl = {
  todos:
    Platform.OS === 'android'
      ? 'http://10.0.2.2:5000/todos/'
      : 'http://localhost:5000/todos/',
  foods:
    Platform.OS === 'android'
      ? 'http://10.0.2.2:5000/foods/'
      : 'http://localhost:5000/foods/',
}