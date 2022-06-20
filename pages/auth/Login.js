import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, ref, push, set } from "firebase/database";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getFirestore } from "firebase/firestore"; 
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const Login = ({navigation}) => {
  const auth = getAuth();

  if (auth.currentUser) {
    navigation.navigate("Home");
  } else {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });
  }

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = async () => {
    signInWithEmailAndPassword(auth, mail, password)
    .then((userCredential) => {
      navigation.navigate("Home", { user: userCredential.user });
      setMail("");
      setPassword("");
    })
    // .catch((error) => {
    //   setErrorMessage(error.message)
    // });
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewInput}>
        <Text style={styles.text}>E-mail</Text>
        <TextInput style={styles.input} onChangeText={newMail => setMail(newMail)} defaultValue={mail} />
      </View>

      <View style={styles.viewInput}>
        <Text style={styles.text}>Password</Text>
        <TextInput secureTextEntry={true} style={styles.input} onChangeText={newPassword => setPassword(newPassword)} defaultValue={password} />
      </View>
      
      <TouchableOpacity style={styles.buttonAdd} onPress={() => signUp()}>
        <Text style={styles.textAddButton}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E323B',
    padding: 20,
  },
  input: {
    padding: 10,
    backgroundColor: "white",
  },
  text: {
    color: "white",
    fontSize: 16,
    marginBottom: 5
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
  },
  viewInput: {
    marginBottom: 20
  }
});

export default Login;