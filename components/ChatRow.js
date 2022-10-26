import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../utils/context/AuthProvider'
import { getMatchedUser } from '../utils/getMatchedUser'
import { useNavigation } from '@react-navigation/native'
import { getLastMessage, getMessages } from '../utils/firebase'

const ChatRow = ({ matchDetails }) => {
    const { user } = useContext(AuthContext)
    const navigation = useNavigation()

    const [matchedUser, setMatchedUser] = useState(null)
    const [lastMessage, setLastMessage] = useState("")

    useEffect(() => {
        setMatchedUser(getMatchedUser(matchDetails.users, user.uid))
    }, [matchDetails, user])

    useEffect(() => {
      const unsub = getLastMessage(matchDetails.id, (snapshot) => 
        setLastMessage(snapshot.docs[0]?.data().message)
      )

      return unsub
    }, [matchDetails])


  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("Message", { matchDetails })}>
      <Image style={styles.profilePic} source={{ uri: matchedUser?.photoURL}}/>
      
      <View>
        <Text style={styles.name}>{matchedUser?.displayName}</Text>
        <Text>{lastMessage || "Say Hi!"}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ChatRow

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 20,
        borderRadius: 20,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41
    },

    profilePic: {
        height: 64,
        width: 64,
        borderRadius: 9999,
        marginRight: 20
    },

    name: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})