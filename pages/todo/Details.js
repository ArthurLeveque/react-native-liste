import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Details = ({route}) => {
  const { title, description, isDone } = route.params;
  return ( 
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.flexButtons}>
        <TouchableOpacity style={[styles.button, styles.deleteButton]}>
          <Text style={styles.textButton}>Delete</Text>
        </TouchableOpacity>
        
        {isDone === false &&
          <TouchableOpacity style={[styles.button, styles.statusButton]}>
            <Text style={styles.textButton}>Mark as done</Text>
          </TouchableOpacity>
        }
        {isDone === true &&
          <TouchableOpacity style={[styles.button, styles.statusButton]}>
            <Text style={styles.textButton}>Not done</Text>
          </TouchableOpacity>
        }
      </View>
      <Text style={styles.description}>{description}</Text>
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