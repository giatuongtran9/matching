import React, { useContext } from 'react'

import AuthStack from '../stack/AuthStack'
import MainStack from '../stack/MainStack'

import { NavigationContainer } from '@react-navigation/native'

import { AuthContext } from '../utils/context/AuthProvider';

const RootStack = () => {
  const { user } = useContext(AuthContext)

  return (
    <NavigationContainer>
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default RootStack