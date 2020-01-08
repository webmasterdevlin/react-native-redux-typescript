import React from 'react';
import {Text} from 'react-native-paper';
import {NavigationStackProp} from "react-navigation-stack";

type Props = {
  navigation: NavigationStackProp;
};

const TodoDetail: React.FC<Props> = (props) => {
  return (
    <Text style={{fontSize: 30}}>{props.navigation.getParam('obj').title}</Text>
  );
};
export default TodoDetail;
