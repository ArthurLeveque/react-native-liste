import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Button } from 'react-native';
import { getAuth, signOut } from "firebase/auth";

import Home from './pages/Home';
import Details from './pages/todo/Details';
import AddTodo from './pages/todo/Add';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';

const Stack = createNativeStackNavigator();

import { initializeApp } from 'firebase/app';

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

const auth = getAuth(app);

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
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" 
        component={Home} 
        options={({navigation}) => ({
          headerLeft: () => null,
          headerBackVisible: false,
          headerRight: () => (
            <Button
              onPress={() => {
                signOut(auth).then(() => {
                  navigation.navigate('Login');
                });
              }}
              title="Disconnect"
              color="#2E323B"
            />
          ),
          })} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="AddTodo" component={AddTodo} options={{ headerTitle: 'Add a To-Do' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}