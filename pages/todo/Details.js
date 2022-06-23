import React, { useState, Component, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Share, Image } from 'react-native';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getFirestore } from "firebase/firestore"; 
import { getStorage, ref, getDownloadURL, deleteObject } from 'firebase/storage';

const Details = ({route, navigation}) => {
  const { id, title, description, isDone, image } = route.params;

  const [tempoIsDone, setTempoIsDone] = useState(false);
  const [imageURL, setImageURL] = useState();

  useEffect(() => {
    setTempoIsDone(isDone);
    if(image) {
      getImage();
    }
  }, [])

  const getImage = async () => {
    const storage = getStorage();
    const reference = ref(storage, image);
    await getDownloadURL(reference).then((URL) => {
      setImageURL(URL);
    });
  }

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
    if(image) {
      const storage = getStorage();
      const reference = ref(storage, image);
      await deleteObject(reference)
    }
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
      
      {image && 
        <Image style={styles.image} source={{uri: imageURL}} />
      }

      <TouchableOpacity style={[styles.button, styles.shareButton]} onPress={() => share()}>
        <Text style={styles.textButton}>Share</Text>
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
    color: 'white',
    marginBottom: 20
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
  },
  shareButton: {
    width: '100%',
    backgroundColor: '#0066ff'
  },
  image: {
    width: '100%',
    height: '100%',
    maxHeight: 300,
    marginBottom: 20
  }
});

export default Details;