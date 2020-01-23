import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5000/', // for iOS simulator
  // baseURL: 'http://10.0.2.2:5000/', // for Android emulator
});
