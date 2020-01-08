import React, {useEffect, useState} from 'react';
import {Dispatch} from 'redux';
import {useSelector, useDispatch} from 'react-redux';
import {fetchTodos, removeTodo, addTodo, updateTodo} from '../todo-actions';
import {View, StyleSheet, Alert} from 'react-native';
import {
  ActivityIndicator,
  Button,
  TextInput,
  Divider,
  Title,
} from 'react-native-paper';
import {ITodoModel} from '../todo-types';
import {IApplicationState} from '../../store';
import {NavigationStackProp} from 'react-navigation-stack';

/* For deep components */
// import {useNavigation} from 'react-navigation-hooks'; React Navigation v4
// import {useNavigation} from '@react-navigation/native'; React Navigation v5

type Props = {
  navigation: NavigationStackProp;
};

const TodoList: React.FC<Props> = props => {
  /* part of Redux pattern */
  const dispatch: Dispatch = useDispatch();
  const {todos, isLoading} = useSelector(
    (state: IApplicationState) => state.todoReducer,
  );

  /* React Hooks */
  const [todo, setTodo] = useState<ITodoModel>({title: ''} as ITodoModel); // The new todo that will be sent to the web API
  const [forEditing, setForEditing] = useState<string>('0'); // For tracking which todo should be edited
  const [todoToUpdate, setTodoToUpdate] = useState<ITodoModel>(
    {} as ITodoModel,
  ); // the todo you've picked to edit

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const handleInputOnChange = (input: string) => {
    // To edit input
    const newTodo = {...todo};
    newTodo.title = input;
    setTodo(newTodo);
  };

  const handleEditOnChange = (input: string) => {
    // To edit input
    const updatedTodo: ITodoModel = {...todoToUpdate};
    updatedTodo.title = input;
    setTodoToUpdate(updatedTodo);
  };

  const handleEditOnPress = (todo: ITodoModel) => {
    // For setup. No form submission here.
    setForEditing(todo.id);
    setTodoToUpdate(todo);
  };

  const handleSaveOnPress = () => {
    dispatch(addTodo(todo));
    setTodo({title: ''} as ITodoModel);
  };

  const handleUpdateOnPress = () => {
    dispatch(updateTodo(todoToUpdate));
  };

  return (
    <View style={styles.container}>
      <View style={{marginBottom: 20}}>
        <TextInput
          onChangeText={handleInputOnChange}
          value={todo.title}
          label="what's new?"
        />
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
          todos.map(t => (
            <View key={t.id} style={styles.cell}>
              {forEditing === t.id ? (
                <TextInput
                  style={styles.input}
                  mode="outlined"
                  multiline={true}
                  value={todoToUpdate.title}
                  onChangeText={handleEditOnChange}
                />
              ) : (
                <Title>{t.title}</Title>
              )}
              <View style={{flexDirection: 'row'}}>
                {forEditing === t.id ? (
                  <View style={{flexDirection: 'row'}}>
                    <Button onPress={() => setForEditing('0')}>Cancel</Button>
                    <Button onPress={() => handleUpdateOnPress()}>
                      Update
                    </Button>
                  </View>
                ) : (
                  <View style={{flexDirection: 'row'}}>
                    <Button icon="pencil" onPress={() => handleEditOnPress(t)}>
                      {' '}
                    </Button>
                    <Button
                      icon="information"
                      onPress={() =>
                        props.navigation.navigate('todoDetail', {obj: t})
                      }>
                      {' '}
                    </Button>
                    <Button
                      icon="delete"
                      onPress={() => dispatch(removeTodo(t.id))}>
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
export default TodoList;
