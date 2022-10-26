import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ReceiverMessage = ({ message, photo }) => {
  return (
    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
      <Image style={styles.image} source={{ uri: photo}} />

      <View style={styles.receiver}>
        <Text style={{ color: 'white'}}>{message.message}</Text>
      </View>
    </View>
  )
}

export default ReceiverMessage

const styles = StyleSheet.create({
  receiver: {
    backgroundColor: 'red',
      borderRadius: 20,
      borderTopLeftRadius: 1,
      padding: 20,
      margin: 10,
      alignSelf: 'flex-start',
      overflow: "hidden"
  },

  image: {
    height: 40,
    width: 40,
    borderRadius: 9999,
  }
})