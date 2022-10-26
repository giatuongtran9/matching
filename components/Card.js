import { Image, StyleSheet, Text, View, Dimensions, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import TinderCard from 'react-tinder-card'
import { checkUserSwipe, getCurrentUser } from '../utils/firebase'

const Card = ({ currentId, profiles }) => {
    const [lastDirection, setLastDirection] = useState()

    const prevent = ['up', 'down']

    const swiped = async (direction, nameToDelete, index) => {
        console.log("removing ", nameToDelete)
        setLastDirection(direction)

        const swipedUser = profiles[index]
        const current = await getCurrentUser(currentId)

        if (direction === 'right') {
            const userSwiped = await checkUserSwipe(swipedUser.id, currentId)

            console.log(userSwiped.exists())
            
        }


    }


    const a = profiles.map((user, i) => (
        <Text key={i}>{user.displayName}</Text>
    ))

    const swipeRight = (cardIndex) => {
        if (!profiles[cardIndex]) return;

        const target = profiles[cardIndex]



    }

    const profileList = profiles.map((user, i) => (
        <TinderCard style={styles.swipe} key={i} onSwipe={(dir) => swiped(dir, user.displayName, i)} preventSwipe={prevent}>
            <ImageBackground style={styles.image} source={{ uri: user.photoURL }}>
                <Text>{user.displayName}</Text>
            </ImageBackground>
        </TinderCard>
    ))

  return (
    // {profiles.map((user, i) => (
    //     <TinderCard key={i} onSwipe={(dir) => swiped(dir, user.displayName)}>
    //         <View>
    //             <Image source={{ uri: user.photoURL }} />
    //             <Text>{user.displayName}</Text>
    //         </View>
    //     </TinderCard>
    // ))}
    <View style={styles.container}>
        {profileList}
    </View>
  )
}

export default Card

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        alignItems: 'center',
        position: 'relative'
    },

    image: {
        height: SCREEN_HEIGHT - 350,
        width: SCREEN_WIDTH - 30,
        borderRadius: 20,
        position: 'relative'
    },

    swipe: {
        position: 'absolute'
    }
})