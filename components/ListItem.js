import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const getUrgencyStyle = (urgency) => {
  if (urgency === "important") {
   return {
     backgroundColor: '#d92626'
   }
  } else if (urgency === "not_important") {
    return {
      backgroundColor: '#808080'
    }
  }
 }

const ListItem = ({ id, title, urgency, navigation }) => {
  return ( 
    <View style={[styles.item, getUrgencyStyle(urgency)]}>
      <Text style={styles.title} onPress={() => navigation.navigate('Details', {id: id})}>{ title }</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    width: '94vw',
    backgroundColor: '#292929',
    marginLeft: '3vw',
    marginRight: '3vw',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "black",
  },
  title: {
    color: 'white',
    fontWeight: "500"
  }
});

export default ListItem;