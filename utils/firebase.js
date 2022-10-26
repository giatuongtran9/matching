import { initializeApp } from 'firebase/app'

import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithCredential, signOut } from 'firebase/auth'

import { getFirestore, doc, collection, getDoc, setDoc, updateDoc, serverTimestamp, onSnapshot, getDocs, query, where, addDoc, orderBy, limit } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import { getMatchedUser } from './getMatchedUser';

const firebaseConfig = {
    apiKey: "AIzaSyD9j1SGjYdgRboT8rjlh3UpRL2XPlPdZAo",
    authDomain: "match-a5b5a.firebaseapp.com",
    projectId: "match-a5b5a",
    storageBucket: "match-a5b5a.appspot.com",
    messagingSenderId: "115214377483",
    appId: "1:115214377483:web:300a1fc351bcaa72795d0e"
  };

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const db = getFirestore()
const storage = getStorage(app)

export const GoogleSignIn = async (token) => {
    console.log("get called")
    const creds = GoogleAuthProvider.credential(token);
    const result = await signInWithCredential(auth, creds)


    const userDocRef = doc(db, "users", result.user.uid)

    const userSnapShot = await getDoc(userDocRef)

    if (!userSnapShot.exists()) {
        const {displayName, email, photoURL, uid} = result.user
        const createdAt = serverTimestamp()

        try {
            await setDoc(userDocRef, {
                displayName, email, createdAt, photoURL, id: uid
            })
        } catch (err) {
            console.log('error creating the user', err.message)
        }
    }
    
    
    return result.user
}


export const SignOut = async () => {
    await signOut(auth)
}

export const checkUserLogin = (setUser) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user)
        } else {
            setUser(null)
        }
    })
}

export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback)
}

export const uploadImage = async (user, data, imageUri) => {

    const fileName = new Date().getTime() + user.displayName

    const storageRef = ref(storage, fileName)


    const response = await fetch(imageUri)
    const blob = await response.blob()

    const result = await uploadBytes(storageRef, blob)

    const url = await getDownloadURL(storageRef)

    const userDocRef = doc(db, "users", user.uid)

    await updateDoc(userDocRef, {
        photoURL: url,
        age: data.age,
        job: data.job
    })

    console.log("uploaded")

}

export const check = (user, callback) => {
    const userDocRef = doc(db, "users", user.uid)
    return onSnapshot(userDocRef, callback)
}

export const getUsers = (passedUserIds, swipedUserIds, callback) => {
    return onSnapshot(query(collection(db, "users"), where("id", "not-in", [...passedUserIds, ...swipedUserIds])), callback)
}

export const getCurrentUser = async (id) => {
    const docRef = doc(db, "users", id)
    const currentUser = await (await getDoc(docRef)).data()

    return currentUser
}

export const passes = async (currentId) => {
    return await getDocs(collection(db, "users", currentId, "passes"))
                        .then((snapshot) => snapshot.docs.map((doc) => doc.id))

}

export const swipes = async (currentId) => {
    return await getDocs(collection(db, "users", currentId, "swipes"))
                        .then((snapshot) => snapshot.docs.map((doc) => doc.id))

}

export const checkUserSwipe = async (swipeId, currentId) => {
    const docRef = doc(db, "users", swipeId, "swipes", currentId)
    return await getDoc(docRef)
}

export const setSwipe = async (currentId, swipedUser) => {
    const docRef = doc(db, "users", currentId, "swipes", swipedUser.id)

    return await setDoc(docRef, swipedUser)
}

export const setPass = async (currentId, passedUser) => {
    const docRef = doc(db, "users", currentId, "passes", passedUser.id)

    return await setDoc(docRef, passedUser)
}

const generateId = (id1, id2) => id1 > id2 ? id1 + id2 : id2 + id1

export const createMatch = async (user, swipedUser) => {
    const currentUser = await (await getDoc(doc(db, "users", user.uid))).data()

    const docRef = doc(db, "matches", generateId(user.uid, swipedUser.id))

    setDoc(docRef, {
        users: {
            [user.uid]: currentUser,
            [swipedUser.id]: swipedUser
        },
        usersMatched: [user.uid, swipedUser.id],
        timestamp: serverTimestamp()
    })

    return { currentUser, swipedUser }
}

export const getMatch = (currentId, callback) => {
    return onSnapshot(query(collection(db, "matches"), where("usersMatched", "array-contains", currentId)), callback)
}

export const addMessage = (matchDetails, user, mess) => {
    addDoc(collection(db, "matches", matchDetails.id, "messages"), {
        timestamp: serverTimestamp(),
        userId: user.uid,
        displayName: user.displayName,
        message: mess
    })
}

export const getMessages = (id, callback) => {
    onSnapshot(query(collection(db, "matches", id, "messages"), orderBy('timestamp', 'desc')), callback)
}

export const getLastMessage = (id, callback) => {
    onSnapshot(query(collection(db, "matches", id, "messages"), orderBy('timestamp', 'desc'), limit(1)), callback)
}

