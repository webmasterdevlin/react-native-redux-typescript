import React, {Component} from 'react';
import {Text} from 'react-native';

interface IProps {
  age: string;
}

type IState = {
  name: string;
};

class FoodListClass extends Component<IProps, IState> {
  // Old useState()
  state = {
    name: '', // default value
  };
  handleSomething = () => {
    const newName = 'Devlin';
    this.setState({name: newName}); // old way of updating state
  };

  // Old useEffect
  componentDidMount() {
    const a = this.props.age;
  }

  render() {
    return <Text></Text>;
  }
}

export default FoodListClass;
