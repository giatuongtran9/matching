import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SenderMessage = ({ message }) => {
  return (
    <View style={styles.sender}>
      <Text style={{ color: 'white'}}>{message.message}</Text>
    </View>
  )
}

export default SenderMessage

const styles = StyleSheet.create({
    sender: {
        backgroundColor: 'purple',
        borderRadius: 20,
        borderTopRightRadius: 1,
        overflow: 'hidden',
        padding: 20,
        margin: 10,
        alignSelf: 'flex-start',
        marginLeft: 'auto',
    }
})