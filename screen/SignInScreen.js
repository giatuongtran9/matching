import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useContext, useLayoutEffect } from 'react'

import { AuthContext } from '../utils/context/AuthProvider'
import { useNavigation } from '@react-navigation/native'

const SignInScreen = () => {
  const { signIn } = useContext(AuthContext)
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} resizeMode='cover' source={{ uri: "https://tinder.com/static/tinder.png"}}>
        <TouchableOpacity style={styles.signin} onPress={() => signIn()}>
          <Text style={styles.signinText}>Sign In With Google</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  image: {
    flex: 1
  },

  signin: {
    position: 'absolute',
    bottom: 100,
    width: 200,
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20
  },

  signinText: {
    textAlign: 'center',
    fontWeight: 'bold'
  }
})