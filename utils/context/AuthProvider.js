import { View, Text } from 'react-native'
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { GoogleSignIn, checkUserLogin, SignOut, onAuthStateChangedListener, auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'

WebBrowser.maybeCompleteAuthSession()

const config = {
    expoClientId: '115214377483-chsc258tvl5hc9d90p182lbnunu9k6t3.apps.googleusercontent.com',
    iosClientId: '115214377483-cboqjc3t9fm2urounae4f5dgr6nj6qu4.apps.googleusercontent.com',
    androidClientId: '115214377483-sm6im6edmpu7p80dbc87sih5akqsmj8m.apps.googleusercontent.com'
}

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(config)

    // NOT WORKING
    // const memoedValue = useMemo(() => ({
    //     user,
    //     signIn,
    //     signOut,
    //     loading,
    //     error
    // }), [user, loading, error])


    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })

        return () => {
            unsub()
        }
    }, [])

    const signIn = async () => {
        setLoading(true)
        const result = await promptAsync().catch(err => setError(err)).finally(() => setLoading(false))
    
        const userRes = await GoogleSignIn(result.params.id_token)
    }


  return (
    <AuthContext.Provider value={{user, signIn, loading, error}}>
        {children}
    </AuthContext.Provider>
  )
}
