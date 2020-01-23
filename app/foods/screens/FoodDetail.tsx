import React from 'react';
import {Text} from 'react-native-paper';

const FoodDetail: React.FC<any> = props => {
  const {obj} = props.route.params;
  return <Text style={{fontSize: 40}}>{obj.name}</Text>;
};

export default FoodDetail;
