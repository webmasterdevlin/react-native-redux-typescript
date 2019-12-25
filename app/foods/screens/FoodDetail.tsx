import React from 'react';
import {Text} from 'native-base';

const FoodDetail: React.FC<void> = (props: any) => (
  <Text style={{fontSize: 40}}>{props.navigation.getParam('id').name}</Text>
);

export default FoodDetail;
