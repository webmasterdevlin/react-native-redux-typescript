import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import TodoDetail from '../todos/screens/TodoDetail';
import TodoList from '../todos/screens/TodoList';
import FormLogin from '../auth/screens/FormLogin';
import FoodList from '../foods/screens/FoodList';
import FoodDetail from '../foods/screens/FoodDetail';
const MainNavigator = createStackNavigator(
  {
    formLogin: {
      screen: FormLogin,
    },
    todoList: {
      screen: TodoList,
      navigationOptions: () => ({
        title: 'Todo List',
      }),
    },
    todoDetail: {
      screen: TodoDetail,
      navigationOptions: () => ({
        title: 'Todo Detail',
      }),
    },
    foodList: {
      screen: FoodList,
      navigationOptions: () => ({
        title: 'Food List',
      }),
    },
    foodDetail: {
      screen: FoodDetail,
      navigationOptions: () => ({
        title: 'Food Detail',
      }),
    },
  },
  {
    initialRouteName: 'formLogin',
  },
);
const RootNavigation = createAppContainer(MainNavigator);
export default RootNavigation;
