import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import MainScreen from '../screen/MainScreen'
import ChatScreen from '../screen/ChatScreen'
import ModalScreen from '../screen/ModalScreen'
import MatchScreen from '../screen/MatchScreen'
import MessageScreen from '../screen/MessageScreen'

const Stack = createNativeStackNavigator()

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true }}>
      <Stack.Group>
        <Stack.Screen name='Home' component={MainScreen}/>
        <Stack.Screen name="Chat" component={ChatScreen}/>
        <Stack.Screen name="Message" component={MessageScreen}/>
      </Stack.Group>

      <Stack.Group screenOptions={{ presentation: 'modal'}}>
        <Stack.Screen name='Modal' component={ModalScreen}/>
      </Stack.Group>

      <Stack.Group screenOptions={{ presentation: 'transparentModal'}}>
        <Stack.Screen name='Match' component={MatchScreen}/>
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default MainStack
