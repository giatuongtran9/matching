import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../utils/context/AuthProvider'
import { getMatch } from '../utils/firebase'
import ChatRow from './ChatRow'

const ChatList = () => {
    const { user } = useContext(AuthContext)

    const [matches, setMatches] = useState([])

    useEffect(() => {
        const unsub = getMatch(user.uid, 
            (snapshot) => 
            setMatches(snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
        ))

        return unsub
    }, [user])

  return matches.length > 0 ? (
    <FlatList
        data={matches}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ChatRow matchDetails={item} />} 
    />
  ) : (
    <View>
        <Text>No matches at the moment</Text>
    </View>
  )

}

export default ChatList

const styles = StyleSheet.create({})