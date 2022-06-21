import React, { useState, Component, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Share } from 'react-native';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getFirestore } from "firebase/firestore"; 

const Details = ({route, navigation}) => {
  const { id, title, description, isDone } = route.params;

  const [tempoIsDone, setTempoIsDone] = useState(false);

  useEffect(() => {
    setTempoIsDone(isDone);
  }, [])

  const markAsDone = async () => {
    const db = getFirestore();
    const toDoRef = doc(db, 'todos', id);
    setDoc(toDoRef, { isDone: true }, { merge: true });
    setTempoIsDone(true);
  };

  const markAsNotDone = async () => {
    const db = getFirestore();
    const toDoRef = doc(db, 'todos', id);
    setDoc(toDoRef, { isDone: false }, { merge: true });
    setTempoIsDone(false);
  };

  let deleteToDo = async () => {
    const db = getFirestore();
    await deleteDoc(doc(db, "todos", id));
    navigation.navigate("Home");
  };

  const share = async () => {
    try {
      const result = await Share.share({
        message:
          `${title}
          ${description}`,
      });
      // if (result.action === Share.sharedAction) {
      //   if (result.activityType) {
      //     // shared with activity type of result.activityType
      //   } else {
      //     // shared
      //   }
      // } else if (result.action === Share.dismissedAction) {
      //   // dismissed
      // }
    } catch (error) {
      alert(error.message);
    }
  };

  return ( 
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.flexButtons}>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => deleteToDo()}>
          <Text style={styles.textButton}>Delete</Text>
        </TouchableOpacity>
        
        {tempoIsDone === false &&
          <TouchableOpacity style={[styles.button, styles.statusButton]} onPress={() => markAsDone()}>
            <Text style={styles.textButton}>Mark as done</Text>
          </TouchableOpacity>
        }
        {tempoIsDone === true &&
          <TouchableOpacity style={[styles.button, styles.statusButton]} onPress={() => markAsNotDone()}>
            <Text style={styles.textButton}>Not done</Text>
          </TouchableOpacity>
        }
      </View>
      <Text style={styles.description}>{description}</Text>
      <TouchableOpacity onPress={() => share()}>
        <Text>Share</Text>
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
  title: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 20
  },
  flexButtons: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  description: {
    color: 'white'
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: '30vw'
  },
  deleteButton: {
    backgroundColor: '#d92626'
  },
  statusButton: {
    backgroundColor: '#0066ff'
  },
  textButton: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center'
  }
});

export default Details;