import { Button, FlatList, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import Header from '../components/Header'
import SenderMessage from '../components/SenderMessage'
import ReceiverMessage from '../components/ReceiverMessage'

import { AuthContext } from '../utils/context/AuthProvider'
import { getMatchedUser } from '../utils/getMatchedUser'
import { useRoute } from '@react-navigation/native'
import { addMessage, getMessages } from '../utils/firebase'

const MessageScreen = () => {
    const { user } = useContext(AuthContext)
    const { params } = useRoute()
    const { matchDetails } = params

    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])
    

    const sendMessage = () => {
        addMessage(matchDetails, user, input)

        setInput("")
    }

    useEffect(() => {
        const unsub = getMessages(matchDetails.id, (snapshot) => 
            setMessages(snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })))
        )

        return unsub
    }, [matchDetails])


  return (
    <SafeAreaView style={{ flex: 1, paddingVertical: Platform.OS === 'android' ? StatusBar.currentHeight : 0, }}>
        <Header title={getMatchedUser(matchDetails?.users, user.uid).displayName} photo={getMatchedUser(matchDetails?.users, user.uid).photoURL}/>

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={10}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <FlatList 
                    inverted={-1}
                    data={messages}
                    keyExtractor={item => item.id}
                    renderItem={({ item: message }) => 
                        message.userId == user.uid ? (
                            <SenderMessage key={message.id} message={message} />
                        ) : (
                            <ReceiverMessage key={message.id} message={message} photo={getMatchedUser(matchDetails?.users, user.uid).photoURL}/>
                        )
                    }
                />
            </TouchableWithoutFeedback>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Send Message'
                    onChangeText={setInput}
                    value={input}
                    onSubmitEditing={sendMessage}
                    style={styles.input}
                />

                <Button onPress={sendMessage} title='Send' color="#FF5864" />
            </View>
        </KeyboardAvoidingView>

    </SafeAreaView>
  )
}

export default MessageScreen

const styles = StyleSheet.create({
    input: {
        height: 20,
        fontSize: 18
    },

    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: 'white',
        marginTop: 10
    }
})