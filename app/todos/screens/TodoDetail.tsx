import React from 'react';
import {Text} from 'react-native-paper';

const TodoDetail: React.FC<any> = props => {
  const {obj} = props.route.params;
  return <Text style={{fontSize: 30}}>{obj.title}</Text>;
};
export default TodoDetail;
