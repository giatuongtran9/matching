import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Image, Platform, StatusBar } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'

import { AuthContext } from '../utils/context/AuthProvider'
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons'

import { db, check, SignOut, getUsers, passes, setSwipe, setPass, checkUserSwipe, createMatch, swipes } from '../utils/firebase'

import Card from '../components/Card'
import CardSwipe from '../components/CardSwipe'


const MainScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext)
  const [profiles, setProfiles] = useState([])
  const [direction, setDirection] = useState('')
  const [index, setIndex] = useState()

  useLayoutEffect(() => {
    check(user, async (snapshot) => {
      if (await !(snapshot.data()).age || await !(snapshot.data()).job) {
        navigation.navigate("Modal")
      } else {
        console.log("Abc")
      }
    })
  }, [])

  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const swipedUser = profiles[cardIndex]

    const checkSwipe = await checkUserSwipe(swipedUser.id, user.uid)

    if (checkSwipe.exists()) {
      console.log(`Congrat, you MATCHED with ${swipedUser.displayName}`)

      setSwipe(user.uid, swipedUser)

      const res = await createMatch(user, swipedUser)

      setIndex(cardIndex)

      navigation.navigate("Match", res)
    } else {
      console.log(`You swiped on ${swipedUser.displayName}`)

      setSwipe(user.uid, swipedUser)
      setIndex(cardIndex)
    }
  }

  const swipeLeft = (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const passedUser = profiles[cardIndex]
    console.log(`You swiped PASS on ${passedUser.displayName}`)

    setPass(user.uid, passedUser)
    setIndex(cardIndex)
  }


  useEffect(() => {
    let unsub;

    const fetchUsers = async () => {
      const pass = await passes(user.uid)
      const swipe = await swipes(user.uid)
    
      const passedUserIds = pass.length > 0 ? pass : ["text"]
      const swipedUserIds = swipe.length > 0 ? swipe : ["text"]

      unsub = getUsers(passedUserIds, swipedUserIds, (snapshot) => {
        setProfiles(
          snapshot.docs.filter(doc => doc.id !== user.uid).map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
        )
      })
    }

    fetchUsers()

    return unsub
  }, [index])


  return (
    <SafeAreaView style={styles.out}>
      
      <View style={styles.container}>
        <TouchableOpacity onPress={() => SignOut()}>
          <Image style={styles.profilePic} source={{ uri: user.photoURL }}/>
        </TouchableOpacity>
      
      
        <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
          <Image style={styles.logo} source={require('../assets/logo.png')}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name='chatbubble-sharp' size={30} color="#ff5864"/>
        </TouchableOpacity>

      </View>
  
      <View style={styles.cardContainer}>
        {profiles.length > 0 ? profiles.map((user, i) => (
          <CardSwipe 
            key={i} 
            user={user} 
            setDirection={setDirection} 
            swipeRight={() => swipeRight(i)}
            swipeLeft={() => swipeLeft(i)}
          />
        ))
        :
        <Text>No more</Text>
        }
      </View>
    </SafeAreaView>
  )
}

export default MainScreen

const styles = StyleSheet.create({
  out: {
    flex: 1,
    paddingVertical: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  container: {
    position: 'relative',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },

  profilePic: {
    height: 40,
    width: 40,
    borderRadius: 50
  },

  logo: {
    width: 50,
    height: 50
  },

  cardContainer: {
    marginTop: 50,
    position: 'relative'
  }
})