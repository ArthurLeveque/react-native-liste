import React from 'react';
import { Image, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


const UploadImage = ({addImage, addPhoto, image}) => {

return (
  <View style={imageUploaderStyles.container}>
    {image  &&
      <Image source={{ uri: image }} style={imageUploaderStyles.image} />
    }

    <View style={imageUploaderStyles.uploadBtnContainer}>
      <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
        <AntDesign name="folder1" size={20} color="white" />
        <Text style={imageUploaderStyles.btnText}>Upload Image</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={addPhoto} style={imageUploaderStyles.uploadBtn} >
        <AntDesign name="camera" size={20} color="white" />
        <Text style={imageUploaderStyles.btnText}>Take photo</Text>
      </TouchableOpacity>
    </View>
  </View>
 );
}

const imageUploaderStyles=StyleSheet.create({
   container:{
    marginBottom: 20
   },
   uploadBtnContainer:{
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
   },
   uploadBtn:{
    padding: 10,
    borderRadius: 5,
    width: '45%',
    backgroundColor: '#0066ff', 
    flexDirection: 'row',
    alignContent: 'center'
   },
   image: {
    width: '100%',
    height: 200,
    marginBottom: 20
  },
  btnText: {
    color: 'white',
    marginLeft: 10
  }
})

export default UploadImage;