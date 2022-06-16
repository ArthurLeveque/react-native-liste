import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import Home from './pages/Home';
import Details from './pages/todo/Details';
import AddTodo from './pages/todo/Add';

const Stack = createNativeStackNavigator();

import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2hRhxjDHG96UtghsHoxYALIrEj45sKEA",
  authDomain: "todo-liste-react-native.firebaseapp.com",
  databaseURL: "https://todo-liste-react-native-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todo-liste-react-native",
  storageBucket: "todo-liste-react-native.appspot.com",
  messagingSenderId: "366060146682",
  appId: "1:366060146682:web:edd7267b2add78c1cc9e43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

initializeApp(firebaseConfig);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#292929',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center'
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="AddTodo" component={AddTodo} options={{ headerTitle: 'Add a To-Do' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E323B',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
