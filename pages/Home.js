import React, { useState, Component, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { getDatabase, ref, onChildAdded, onChildChanged, onChildRemoved, onValue } from "firebase/database";

import ListItem from '../components/ListItem';

const DATA = [
  {
    // id: '1',
    title: 'First Item',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacinia eros elit. Phasellus sodales sed magna ut porta. Ut id odio et turpis laoreet egestas. Cras vitae ligula massa. Nam ultricies leo nec lacus accumsan sagittis. Nullam facilisis imperdiet dui vel tristique. Donec dictum, nisi vel vestibulum accumsan, ex mi egestas ex, nec venenatis purus nulla a nulla. Quisque in leo interdum, faucibus erat vitae, euismod purus.',
    isDone: true,
    urgency: 'normal'
  },
  {
    // id: '2',
    title: 'Second Item',
    description: 'Vestibulum bibendum tincidunt nulla ac efficitur. Nam aliquet augue id sollicitudin consectetur. Duis blandit pellentesque condimentum. Quisque sed erat fermentum magna tincidunt dictum ac aliquam mauris. Fusce egestas posuere mauris, et elementum urna laoreet eget. Duis tempus lorem et leo volutpat aliquet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas vel cursus purus, ut eleifend turpis. Etiam sed augue nec urna mollis venenatis.',
    isDone: false,
    urgency: 'important'
  },
  {
    // id: '3',
    title: 'Third Item',
    description: 'Aliquam erat volutpat. Ut quis sollicitudin felis. Quisque id erat feugiat, porttitor massa non, suscipit purus. Praesent pharetra quam quis nulla laoreet, at faucibus massa blandit. In hendrerit laoreet magna sit amet facilisis. Praesent libero elit, sodales non dui eleifend, varius semper magna. Donec vel lorem sed nunc pulvinar tempus. Curabitur interdum placerat ex porta interdum. Maecenas eget neque in dolor tempor faucibus. Sed dapibus quis quam vel lobortis. Nullam molestie turpis id malesuada egestas. Sed egestas non purus a dictum. Donec nec vestibulum nunc. Morbi in turpis aliquam, vulputate libero pulvinar, suscipit leo. Donec eget magna libero.',
    isDone: false,
    urgency: 'not_important'
  }
];

const Home = ({navigation}) => {
  const [todoData, setTodoData] = useState('');

  const onScreenLoad = async () => {
    const db = getDatabase();
    const todosRef = ref(db, 'todos');
    
    onValue(todosRef, (snapshot) => {
      const data = snapshot.val();
      setTodoData(Object.values(data));
    });
  }

  useEffect(() => {
      onScreenLoad();
  }, [setTodoData])

  const renderItem = ({ item }) => (
    <ListItem 
    id={item.id}
    title={item.title}
    description={item.description}
    isDone={item.isDone}
    urgency={item.urgency} 
    navigation={navigation} />
  );

  return ( 
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonAdd} onPress={() => navigation.navigate('AddTodo')}>
        <Text style={styles.textAddButton}>Add +</Text>
      </TouchableOpacity>

      <FlatList
        data={todoData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E323B',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonAdd: {
    backgroundColor: '#0066ff',
    marginLeft: '3vw',
    marginRight: '3vw',
    width: '94vw',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  textAddButton: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center'
  }
});

export default Home;