import React from 'react';
import TodoDetail from '../todos/screens/TodoDetail';
import TodoList from '../todos/screens/TodoList';
import FormLogin from '../auth/screens/FormLogin';
import FoodList from '../foods/screens/FoodList';
import FoodDetail from '../foods/screens/FoodDetail';
import {NavigationNativeContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function RootNavigation() {
  return (
    <NavigationNativeContainer>
      <Stack.Navigator initialRouteName="formLogin">
        <Stack.Screen
          name="formLogin"
          component={FormLogin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="todoDetail"
          component={TodoDetail}
          options={{title: 'Todo Detail'}}
        />
        <Stack.Screen
          name="todoList"
          component={TodoList}
          options={{title: 'Todo List'}}
        />
        <Stack.Screen
          name="foodList"
          component={FoodList}
          options={{title: 'Food List'}}
        />
        <Stack.Screen
          name="foodDetail"
          component={FoodDetail}
          options={{title: 'Food Detail'}}
        />
      </Stack.Navigator>
    </NavigationNativeContainer>
  );
}
