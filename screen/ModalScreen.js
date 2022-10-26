import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../utils/context/AuthProvider'
import { uploadImage } from '../utils/firebase'

import * as ImagePicker from 'expo-image-picker'

const ModalScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext)

  const [imageURI, setImageURI] = useState('')
  const [job, setJob] = useState("")
  const [age, setAge] = useState(0)

  const incomplete = !imageURI

  const pickImage = async () => {

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status !== 'granted') {
        alert("Sorry, we need camera roll permissions to make this work!")
        return;
    } else {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true
        })


        if (!result.cancelled) {

            setImageURI(result.uri)
        }

    }

  }

  const upload = async () => {
    const data = {
      job, age
    }
    uploadImage(user, data, imageURI)
    .then(() => {
      navigation.navigate("Home")
    })
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://1000logos.net/wp-content/uploads/2018/07/Tinder-logo.png",
        }}
        resizeMode="contain"
        style={styles.img}
      />

      <Text style={{ fontSize: 24, fontWeight: "bold", color: "gray" }}>
        Welcome {user.displayName}
      </Text>

      <Text
        style={{ fontSize: 15, fontWeight: "bold", color: "red", padding: 30 }}
      >
        Step 1: The Profile Picture
      </Text>
      {imageURI && <Image source={{ uri: imageURI }} style={{ width: 200, height: 200 }} />}
      <TouchableOpacity onPress={() => pickImage()}>
        <Text>Upload Image</Text>
      </TouchableOpacity>

      <Text
        style={{ fontSize: 15, fontWeight: "bold", color: "red", padding: 30 }}
      >
        Step 2: The Job
      </Text>
      <TextInput value={job} onChangeText={text => setJob(text)} placeholder="Enter your occupation" />

      <Text
        style={{ fontSize: 15, fontWeight: "bold", color: "red", padding: 30 }}
      >
        Step 3: The Age
      </Text>
      <TextInput keyboardType="numeric" value={age} onChangeText={text => setAge(text)} placeholder="Enter your age" />
      
      <TouchableOpacity disabled={incomplete} style={[styles.updateButton, incomplete ? { backgroundColor: 'gray'} : { backgroundColor: 'red'}]} onPress={upload}>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Update Profile</Text>
      </TouchableOpacity>

    </View>
    </TouchableWithoutFeedback>
  )
}

export default ModalScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  img: {
    height: 80,
    width: "100%",
  },

  updateButton: {
    width: 200,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    bottom: 50,
    position: 'absolute'
  }
})