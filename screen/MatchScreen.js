import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

const SCREEN_WIDTH = Dimensions.get('window').width

const MatchScreen = () => {
    const navigation = useNavigation()
    const route = useRoute()

    const { currentUser, swipedUser } = route.params

  return (

    <View style={styles.container}>
      <View style={styles.title}>
        <Image style={styles.image} source={{ uri: 'https://e9digital.com/love-at-first-website/images/its-a-match.png'}} />
      </View>

      <Text style={styles.text}>
        You and {swipedUser.displayName} have liked each other!
      </Text>

      <View style={styles.avaContainer}>
        <Image style={styles.ava} source={{ uri: currentUser.photoURL}} />
        <Image style={styles.ava} source={{ uri: swipedUser.photoURL}} />
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
            navigation.goBack()
            navigation.navigate("Chat")
        }}
      >
        <Text style={{ textAlign: 'center', fontSize: 15 }}>Send a Message</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MatchScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        opacity: 0.95,
        height: '100%',
        paddingTop: 100,
    },

    title: {
        paddingHorizontal: 20,
    },

    image: {
        width: SCREEN_WIDTH - 50,
        height: 100,
        resizeMode: 'contain'
    },

    text: {
        textAlign: 'center',
        color: 'white',
        fontSize: 15,
        marginTop: 20
    },

    avaContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 50
    },

    ava: {
        height: 150,
        width: 150,
        borderRadius: 99999
    },

    button: {
        backgroundColor: 'white',
        margin: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 50,
        marginTop: 100
    }
})