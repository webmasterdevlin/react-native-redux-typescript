import React, {Component} from 'react';
import {Text} from 'react-native';

interface IProps {
}

interface IState {
}

class FoodListClass extends Component {
  // Old useState()
  state = {
    name: '', // default value
  };
  handleSomething = () => {
    const newName = 'Devlin';
    this.setState({name: newName}); // old way of updating state
  };

  // Old useEffect
  componentDidMount() {}

  render() {
    return <Text></Text>;
  }
}

export default FoodListClass;
