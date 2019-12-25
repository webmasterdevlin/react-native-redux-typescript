import React, {useEffect, useState} from 'react';
import {StyleSheet, RefreshControl} from 'react-native';
import {
  Container,
  Footer,
  Content,
  View,
  Text,
  Button,
  Item,
  Icon,
  Label,
  Input,
  Spinner,
  List,
  ListItem,
} from 'native-base';
import {useNavigation} from 'react-navigation-hooks';
import {useSelector, useDispatch} from 'react-redux';
import {fetchFoods, removeFood, updateFood, addFood} from '../food-actions';
import {IFoodModel} from '../food-types';
import {Dispatch} from 'redux';
import {IApplicationState} from '../../store';

const FoodList: React.FC<void> = () => {
  /* React Navigation */
  const {navigate} = useNavigation();

  /* Redux*/
  const dispatch: Dispatch = useDispatch();
  const {foods, isLoading} = useSelector(
    (state: IApplicationState) => state.foodReducer,
  );

  /* React Hooks */
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [food, setFood] = useState<IFoodModel>({} as IFoodModel); // The new todo that will be sent to the web API
  const [forEditing, setForEditing] = useState<string>('0'); // For tracking which todo should be edited
  const [foodToUpdate, setFoodToUpdate] = useState<IFoodModel>(
    {} as IFoodModel,
  ); // the todo you've picked to edit

  useEffect(() => {
    dispatch(fetchFoods());
  }, []);

  const handleInputOnChange = (input: string) => {
    // To edit input
    const newFood: IFoodModel = {...food};
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
    <Container style={{backgroundColor: '#EAF2F5'}}>
      <View style={{marginLeft: 20, marginRight: 20}}>
        <Item floatingLabel>
          <Label>what's new</Label>
          <Input onChangeText={handleInputOnChange} />
        </Item>
        <Button success full onPress={() => handleSaveOnPress()}>
          <Text>Save</Text>
        </Button>
      </View>
      <Content
        //@ts-ignore
        scrollEnable
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => {
              setIsRefreshing(true);
              try {
                dispatch(fetchFoods());
              } catch (e) {
              } finally {
                setIsRefreshing(false);
              }
            }}
            title="Loading..."
          />
        }
        style={{margin: 20}}>
        <List>
          {isLoading ? (
            <Spinner color="blue" />
          ) : (
            foods.map((f: IFoodModel) => (
              <ListItem
                key={f.id}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                {forEditing === f.id ? (
                  <Input
                    value={foodToUpdate.name}
                    onChangeText={handleEditOnChange}
                  />
                ) : (
                  <Text style={{fontSize: 24}}>{f.name}</Text>
                )}
                <View style={{flex: 0, flexDirection: 'row'}}>
                  {forEditing === f.id ? (
                    <View style={{flex: 0, flexDirection: 'row'}}>
                      <Button
                        style={{marginRight: 5}}
                        info
                        onPress={() => setForEditing('0')}>
                        <Text>Cancel</Text>
                      </Button>
                      <Button light onPress={() => handleUpdateOnPress()}>
                        <Text>Update</Text>
                      </Button>
                    </View>
                  ) : (
                    <View style={{flex: 0, flexDirection: 'row'}}>
                      <Button
                        style={{marginRight: 5}}
                        warning
                        onPress={() => handleEditOnPress(f)}>
                        <Icon type="FontAwesome5" name="pen" />
                      </Button>
                      <Button
                        style={{marginRight: 5}}
                        primary
                        onPress={() => navigate('foodDetail', {id: f})}>
                        <Icon type="FontAwesome5" name="info-circle" />
                      </Button>
                      <Button danger onPress={() => dispatch(removeFood(f.id))}>
                        <Icon type="FontAwesome5" name="trash" />
                      </Button>
                    </View>
                  )}
                </View>
              </ListItem>
            ))
          )}
        </List>
      </Content>
      <Footer style={styles.footer}>
        <Text style={styles.footerText} note>
          Footer
        </Text>
      </Footer>
    </Container>
  );
};
export default FoodList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    padding: 20,
  },
  cell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  footer: {
    backgroundColor: '#9C27B0',
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    fontSize: 32,
  },
});
