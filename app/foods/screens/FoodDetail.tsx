import React from 'react';
import {Text} from 'react-native-paper';
import {NavigationStackProp} from 'react-navigation-stack';

interface IProps {
  navigation: NavigationStackProp;
}

const FoodDetail: React.FC<IProps> = props => (
  <Text style={{fontSize: 40}}>{props.navigation.getParam('obj').name}</Text>
);

export default FoodDetail;
