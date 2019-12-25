import React, {useEffect, useState} from 'react';
import {Dispatch} from 'redux';
import {useSelector, useDispatch} from 'react-redux';
import {fetchTodos, removeTodo, addTodo, updateTodo} from '../todo-actions';
import {StyleSheet, RefreshControl} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
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
import {ITodoModel} from "../todo-types";
import {IApplicationState} from "../../store";

const TodoList: React.FC<void> = () => {
  /* React Navigation */
  const {navigate} = useNavigation();

  /* part of Redux pattern */
  const dispatch: Dispatch = useDispatch();
  const {todos, isLoading} = useSelector((state: IApplicationState) => state.todoReducer);

  /* React Hooks */
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [todo, setTodo] = useState<ITodoModel>({} as ITodoModel); // The new todo that will be sent to the web API
  const [forEditing, setForEditing] = useState<string>('0'); // For tracking which todo should be edited
  const [todoToUpdate, setTodoToUpdate] = useState<ITodoModel>({} as ITodoModel); // the todo you've picked to edit

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
  };

  const handleUpdateOnPress = () => {
    dispatch(updateTodo(todoToUpdate));
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
          // @ts-ignore
          scrollEnable
          refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => {
              setIsRefreshing(true);
              try {
                dispatch(fetchTodos());
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
            todos.map((t : ITodoModel) => (
              <ListItem
                key={t.id}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                {forEditing === t.id ? (
                  <Input
                    value={todoToUpdate.title}
                    onChangeText={handleEditOnChange}
                  />
                ) : (
                  <Text style={{fontSize: 24}}>{t.title}</Text>
                )}
                <View style={{flex: 0, flexDirection: 'row'}}>
                  {forEditing === t.id ? (
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
                        onPress={() => handleEditOnPress(t)}>
                        <Icon type="FontAwesome5" name="pen" />
                      </Button>
                      <Button
                        style={{marginRight: 5}}
                        primary
                        onPress={() => navigate('todoDetail', {id: t})}>
                        <Icon type="FontAwesome5" name="info-circle" />
                      </Button>
                      <Button danger onPress={() => dispatch(removeTodo(t.id))}>
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
export default TodoList;
