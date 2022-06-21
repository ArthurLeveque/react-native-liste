import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';

import UploadImage from '../../components/UploadImage';

const AddTodo = ({navigation}) => {
  const auth = getAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState('normal');
  const [image, setImage] = useState(null);
  const [imageFilename, setImageFilename] = useState(null);

  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });

    if (!_image.cancelled) {
      setImage(_image.uri);
      setImageFilename(_image.fileName);
    }
  }

  const data = {
    title: title,
    description: description,
    urgency: urgency,
    isDone: false,
    userId: auth.currentUser.uid
  };

  const AddTodo = async () => {
    if(image) {
      const storage = getStorage();
      console.log(imageFilename)
      const reference = ref(storage, 'file.png');

      const img = await fetch(image.uri);
      const bytes = await img.blob();

      await uploadBytes(reference, bytes);
    }

    const db = getFirestore();
    await addDoc(collection(db, "todos"), data);
    
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewInput}>
        <Text style={styles.text}>Title</Text>
        <TextInput style={styles.input} placeholder="Title" onChangeText={newTitle => setTitle(newTitle)} defaultValue={title} />
      </View>

      <View style={styles.viewInput}>
        <Text style={styles.text}>Description</Text>
        <TextInput style={styles.input} placeholder="Description" onChangeText={newDescription => setDescription(newDescription)} defaultValue={description} />
      </View>

      <View style={styles.viewInput}>
        <Text style={styles.text}>Urgency</Text>
        <Picker style={styles.input} selectedValue={urgency} onValueChange={currentUrgency => setUrgency(currentUrgency)}>
          <Picker.Item label="Not important" value="not_important" />
          <Picker.Item label="Normal" value="normal" />
          <Picker.Item label="Important" value="important" />
        </Picker>
      </View>

      <UploadImage addImage={addImage} image={image} />

      <TouchableOpacity style={styles.buttonAdd} onPress={() => AddTodo()}>
        <Text style={styles.textAddButton}>Add +</Text>
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

export default AddTodo;