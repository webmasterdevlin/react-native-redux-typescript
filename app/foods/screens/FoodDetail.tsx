import React from 'react';
import {Text} from 'react-native-paper';

const FoodDetail: React.FC<any> = props => (
  <Text style={{fontSize: 40}}>{props.navigation.getParam('obj').name}</Text>
);

export default FoodDetail;
