import React from 'react';
import {Text} from 'react-native';

const TodoDetail = (props: any) => {
  return (
    <Text style={{fontSize: 30}}>{props.navigation.getParam('id').title}</Text>
  );
};
export default TodoDetail;
