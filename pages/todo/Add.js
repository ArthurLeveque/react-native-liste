import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, ref, push, set } from "firebase/database";

const AddTodo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState('normal');

  const data = {
    title: title,
    description: description,
    urgency: urgency,
    isDone: false
  };

  const AddTodo = async () => {
    const db = getDatabase();
    const reference = ref(db, 'todos');
    const newTodo = push(reference);
    set(newTodo, data);
    // try {
    //   const json = JSON.stringify(data);
    //   await AsyncStorage.setItem(
    //     '@todo',
    //     json
    //   );
    // } catch (error) {
    //   // Error saving data
    // }

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