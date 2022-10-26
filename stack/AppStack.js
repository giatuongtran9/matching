import React from 'react'

import { AuthProvider } from '../utils/context/AuthProvider'
import RootStack from './RootStack'

const AppStack = () => {
  return (
    <AuthProvider>
        <RootStack />
    </AuthProvider>
  )
}

export default AppStack