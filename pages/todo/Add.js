import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const AddTodo = () => {
  return (
    <View style={styles.container}>
      <Text>ADD TODO</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E323B',
    padding: 20,
  },
});

export default AddTodo;