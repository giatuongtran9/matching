import { StyleSheet, Text, View, Dimensions, Animated, PanResponder, ImageBackground, Image } from 'react-native'
import React, { useState } from 'react'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const CardSwipe = ({ user, setDirection, swipeRight, swipeLeft }) => {
    const [xPosition, setXPosition] = useState(new Animated.Value(0))

    let swipeDirection = ''
    let cardOpacity = new Animated.Value(1)
    let rotateCard = xPosition.interpolate({
        inputRange: [-200, 0, 200],
        outputRange: ['-20deg', '0deg', '20deg']
    })

    let panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => false,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {
            xPosition.setValue(gestureState.dx)

            if (gestureState.dx > SCREEN_WIDTH - 250) {
                swipeDirection = 'right'
            } else if (gestureState.dx < -SCREEN_WIDTH + 250) {
                swipeDirection = 'left'
            }
        },
        onPanResponderRelease: (evt, gestureState) => {
            if (
                gestureState.dx < SCREEN_WIDTH - 150 &&
                gestureState.dx > -SCREEN_WIDTH + 150
            ) {
                swipeDirection = ''
                Animated.spring(xPosition, {
                    toValue: 0,
                    speed: 5,
                    bounciness: 10,
                    useNativeDriver: false
                }).start()
            } else if (gestureState.dx > SCREEN_WIDTH - 150) {
                Animated.parallel([
                    Animated.timing(xPosition, {
                        toValue: SCREEN_WIDTH,
                        duration: 200,
                        useNativeDriver: false
                    }),
                    Animated.timing(cardOpacity, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: false
                    })
                ]).start(() => {
                    setDirection(swipeDirection)
                    swipeRight()
                    // removeCard()
                })
            } else if (gestureState.dx < -SCREEN_WIDTH + 150) {
                Animated.parallel([
                    Animated.timing(xPosition, {
                        toValue: -SCREEN_WIDTH,
                        duration: 200,
                        useNativeDriver: false
                    }),
                    Animated.timing(cardOpacity, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: false
                    })
                ]).start(() => {
                    setDirection(swipeDirection)
                    swipeLeft()
                    // removeCard()
                })
            }
        }
    })

  return (
        <Animated.View
            {...panResponder.panHandlers}
            style={[
                styles.card,
                {
                    opacity: cardOpacity,
                    transform: [{ translateX: xPosition }, { rotate: rotateCard }]
                }
            ]}>
                    <Image style={styles.image} source={{ uri: user.photoURL }} />
                    <View style={styles.infoContainer}>
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: 'bold'}}>{user.displayName}</Text>
                            <Text style={{ textAlign: 'center', color: 'gray'}}>{user.job}</Text>
                            
                        </View>

                        <View>
                            <Text style={{ fontSize: 25, fontWeight: 'bold'}}>{user.age}</Text>
                        </View>
                    </View>
        </Animated.View>
  )
}

export default CardSwipe

const styles = StyleSheet.create({

    card: {
        height: SCREEN_HEIGHT - 280,
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: 20,
        alignSelf: 'center'
    },

    image: {
        height: SCREEN_HEIGHT - 350,
        width: SCREEN_WIDTH - 50,
        borderBottomEndRadius: 'none',
        borderBottomStartRadius: 'none',
        resizeMode: 'cover',
        borderRadius: 20,
    },

    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 10
    }
})