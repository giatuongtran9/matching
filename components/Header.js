import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import { Foundation, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'


const Header = ({ title, callEnabled, photo }) => {
    const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={34} color="#FF5864" />
        </TouchableOpacity>

        {photo && <Image style={styles.ava} source={{ uri: photo}} />}
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },

    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },

    title: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingLeft: 10
    },

    ava: {
      height: 30,
      width: 30,
      borderRadius: 9999
    }
})