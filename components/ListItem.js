import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const getUrgencyStyle = (urgency) => {
  if (urgency === "important") {
   return {
    borderColor: '#d92626'
   }
  } else if (urgency === "not_important") {
    return {
      borderColor: '#808080'
    }
  }
 }

 const getStatusStyle = (isDone) => {
  if (isDone === true) {
   return {
    backgroundColor: '#33cc33'
   }
  } else {
    return {
      backgroundColor: '#d92626'
    }
  }
 }

const ListItem = ({ id, title, description, isDone, urgency, image, navigation }) => {
  return ( 
    <TouchableOpacity style={[styles.item, getUrgencyStyle(urgency)]} 
      onPress={() => navigation.navigate('Details', {
        id: id,
        title: title,
        description: description,
        isDone: isDone,
        image: image
      })}
    >
      <Text style={styles.title}>{ title }</Text>
      <View style={[styles.chip, , getStatusStyle(isDone)]}></View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#292929',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderColor: 'white',
  },
  title: {
    color: 'white',
    fontWeight: "500"
  },
  chip: {
    width: 8,
    height: 8,
    borderRadius: 5
  }
});

export default ListItem;