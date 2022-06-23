import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { collection, query, where, getDocs,getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";

import ListItem from '../components/ListItem';

const Home = ({navigation}) => {
  const auth = getAuth();
  const [todoData, setTodoData] = useState('');
  const [loading, setLoading] = useState(true);

  const onScreenLoad = async () => {
    setLoading(true);
    const db = getFirestore();
    const q = query(collection(db, "todos"), where("userId", "==", auth.currentUser.uid));

    const querySnapshot = await getDocs(q);
    let toDos = [];
    querySnapshot.forEach((doc) => {
      let toDo = doc.data();
      toDo.id = doc.id;
      toDos.push(toDo);
    });

    setTodoData(toDos);
    setLoading(false);
  }

  useEffect(() => {
    navigation.addListener('focus', () => {
      onScreenLoad();
    })
  }, [])

  const renderItem = ({ item }) => (
    <ListItem 
    id={item.id}
    title={item.title}
    description={item.description}
    isDone={item.isDone}
    urgency={item.urgency} 
    image={item.image}
    navigation={navigation} />
  );

  return ( 
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.buttonAdd} onPress={() => navigation.navigate('AddTodo')}>
        <Text style={styles.textAddButton}>Add +</Text>
      </TouchableOpacity>
      {loading === false &&
        <FlatList
          data={todoData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      }
      {loading === true &&
        <Text style={styles.textAddButton}>Loading...</Text>
      }
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E323B',
    padding: 20
  },
  buttonAdd: {
    backgroundColor: '#0066ff',
    width: '100%',
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