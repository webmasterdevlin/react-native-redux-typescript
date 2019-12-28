import React from 'react';
import {Text} from 'react-native-paper';

const TodoDetail = (props: any) => {
  return (
    <Text style={{fontSize: 30}}>{props.navigation.getParam('obj').title}</Text>
  );
};
export default TodoDetail;
