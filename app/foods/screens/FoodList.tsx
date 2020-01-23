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
  HelperText,
  Title,
} from 'react-native-paper';
import {IFoodModel} from '../food-types';
import {IApplicationState} from '../../store';
import {NavigationStackProp} from 'react-navigation-stack';
import {Formik} from 'formik';
import * as Yup from 'yup';

/* For deep components */
// import {useNavigation} from 'react-navigation-hooks'; React Navigation v4
// import {useNavigation} from '@react-navigation/native'; React Navigation v5

interface IProps {
  navigation: NavigationStackProp;
}

/* Using Formik*/
const FoodList: React.FC<IProps> = props => {
  /* part of Redux pattern */
  const dispatch: Dispatch = useDispatch();
  const {foods, isLoading} = useSelector(
    (state: IApplicationState) => state.foodReducer,
  );

  /* React Hooks */
  const [food, setFood] = useState<IFoodModel>({
    name: '',
  } as IFoodModel); // The new food that will be sent to the web API
  const [forEditing, setForEditing] = useState<string>('0'); // For tracking which food should be edited

  useEffect(() => {
    dispatch(fetchFoods());
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .label('Name')
      .min(3, 'Name must have at least 4 characters')
      .required(),
  });

  return (
    <View style={styles.container}>
      <View style={{marginBottom: 20}}>
        <Formik
          initialValues={food}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            dispatch(addFood(values));
            actions.resetForm();
          }}>
          {formikProps => (
            <View>
              <TextInput
                onChangeText={formikProps.handleChange('name')}
                onBlur={formikProps.handleBlur('name')}
                value={formikProps.values.name}
                label="what's new?"
              />
              <HelperText type={'error'}>{formikProps.errors.name}</HelperText>
              <Button mode="contained" onPress={formikProps.handleSubmit}>
                Save
              </Button>
            </View>
          )}
        </Formik>

        <Divider />
      </View>
      <View style={styles.list}>
        {isLoading ? (
          <View style={styles.loaderBase}>
            <ActivityIndicator animating size="large" />
          </View>
        ) : (
          foods.map(f => (
            <Formik
              key={f.id}
              initialValues={f}
              validationSchema={validationSchema}
              onSubmit={(values, actions) => {
                dispatch(updateFood(values));
              }}>
              {formikProps => (
                <View style={styles.cell}>
                  {forEditing === f.id ? (
                    <View style={styles.input}>
                      <TextInput
                        mode="outlined"
                        multiline={true}
                        value={formikProps.values.name}
                        onChangeText={formikProps.handleChange('name')}
                        onBlur={formikProps.handleBlur('name')}
                      />
                      <HelperText type={'error'}>
                        {formikProps.errors.name}
                      </HelperText>
                    </View>
                  ) : (
                    <Title>{f.name}</Title>
                  )}
                  <View style={{flexDirection: 'row'}}>
                    {forEditing === f.id ? (
                      <View style={{flexDirection: 'row'}}>
                        <Button onPress={() => setForEditing('0')}>
                          Cancel
                        </Button>
                        <Button onPress={formikProps.handleSubmit}>
                          Update
                        </Button>
                      </View>
                    ) : (
                      <View style={{flexDirection: 'row'}}>
                        <Button
                          icon="pencil"
                          onPress={() => setForEditing(f.id)}>
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
              )}
            </Formik>
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
