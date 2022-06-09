import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

const Details = ({route}) => {
  const { id } = route.params;
  return ( 
    <View style={styles.container}>
      <Text>{JSON.stringify(id)}</Text>
    </View>
  );
}
const styles = StyleSheet.create({

});

export default Details;