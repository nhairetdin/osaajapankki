import { firebase } from './firebase'

const db = firebase.firestore()

db.settings({
  timestampsInSnapshots: true
})

export const signUpWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithPopup(provider).then((result) => {
    console.log(result)
  }).catch(err => { 
      console.log('sign-in failed', err)
    })
}

export const signUpWithEmailAndPassword = (email, pass) => {
  firebase.auth().signInWithEmailAndPassword(email, pass).then(result => {
    console.log("ok")
  }).catch(err => {
    console.log(err)
  })
}

export const createUserWithEmailAndPassword = (email, pass) => {
  firebase.auth().createUserWithEmailAndPassword(email,pass)
    .then(() => {
      console.log("user created")
    })
    .catch((err) => {
      console.log("user creation failed")
    })
}

export const signOut = () => { firebase.auth().signOut() }

export const sendPasswordResetEmail = async (email) => {
  try {
    await firebase.auth().sendPasswordResetEmail(email)
    return true
  } catch (error) {
    return false
  }
}