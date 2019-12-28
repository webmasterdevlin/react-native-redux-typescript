import React, {useEffect, useState} from 'react';
import {Dispatch} from 'redux';
import {useSelector, useDispatch} from 'react-redux';
import {fetchFoods, removeFood, addFood, updateFood} from '../food-actions';
import {View, StyleSheet} from 'react-native';
import {
  ActivityIndicator,
  Button,
  TextInput,
  Divider,
  Title,
} from 'react-native-paper';
import {IFoodModel} from '../food-types';
import {IApplicationState} from '../../store';

const FoodList: React.FC<any> = props => {
  /* part of Redux pattern */
  const dispatch: Dispatch = useDispatch();
  const {foods, isLoading} = useSelector(
    (state: IApplicationState) => state.foodReducer,
  );

  /* React Hooks */
  const [food, setFood] = useState<IFoodModel>({} as IFoodModel); // The new food that will be sent to the web API
  const [forEditing, setForEditing] = useState<string>('0'); // For tracking which food should be edited
  const [foodToUpdate, setFoodToUpdate] = useState<IFoodModel>(
    {} as IFoodModel,
  ); // the food you've picked to edit

  useEffect(() => {
    dispatch(fetchFoods());
  }, []);

  const handleInputOnChange = (input: string) => {
    // To edit input
    const newFood = {...food};
    newFood.name = input;
    setFood(newFood);
  };

  const handleEditOnChange = (input: string) => {
    // To edit input
    const updatedFood: IFoodModel = {...foodToUpdate};
    updatedFood.name = input;
    setFoodToUpdate(updatedFood);
  };

  const handleEditOnPress = (food: IFoodModel) => {
    // For setup. No form submission here.
    setForEditing(food.id);
    setFoodToUpdate(food);
  };

  const handleSaveOnPress = () => {
    dispatch(addFood(food));
  };

  const handleUpdateOnPress = () => {
    dispatch(updateFood(foodToUpdate));
  };

  return (
    <View style={styles.container}>
      <View style={{marginBottom: 20}}>
        <TextInput onChangeText={handleInputOnChange} label="what's new?" />
        <Button mode="contained" onPress={() => handleSaveOnPress()}>
          Save
        </Button>
        <Divider />
      </View>
      <View style={styles.list}>
        {isLoading ? (
          <View style={styles.loaderBase}>
            <ActivityIndicator animating size="large" />
          </View>
        ) : (
          foods.map((f: IFoodModel) => (
            <View key={f.id} style={styles.cell}>
              {forEditing === f.id ? (
                <TextInput
                  style={styles.input}
                  mode="outlined"
                  multiline={true}
                  value={foodToUpdate.name}
                  onChangeText={handleEditOnChange}
                />
              ) : (
                <Title>{f.name}</Title>
              )}
              <View style={{flexDirection: 'row'}}>
                {forEditing === f.id ? (
                  <View style={{flexDirection: 'row'}}>
                    <Button onPress={() => setForEditing('0')}>Cancel</Button>
                    <Button onPress={() => handleUpdateOnPress()}>
                      Update
                    </Button>
                  </View>
                ) : (
                  <View style={{flexDirection: 'row'}}>
                    <Button icon="pencil" onPress={() => handleEditOnPress(f)}>
                      {' '}
                    </Button>
                    <Button
                      icon="information"
                      onPress={() =>
                        props.navigation.navigate('foodDetail', {obj: f})
                      }>
                      {' '}
                    </Button>
                    <Button
                      icon="delete"
                      onPress={() => dispatch(removeFood(f.id))}>
                      {' '}
                    </Button>
                  </View>
                )}
              </View>
            </View>
          ))
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  loaderBase: {
    flex: 1,
    margin: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '40%',
    fontSize: 20,
  },
  list: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  cell: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
});
export default FoodList;
