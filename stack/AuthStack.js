import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SignInScreen from '../screen/SignInScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

const AuthStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name='SignIn' component={SignInScreen} />
      </Stack.Navigator>
    )
  }

export default AuthStack

const styles = StyleSheet.create({})