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

export const signUpWithEmailAndPassword = async (email, pass) => {
  return await firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(result => {
      return false
    }).catch(err => {
      return err.message
    })
}

export const createUserWithEmailAndPassword = async (email, pass) => {
  return await firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then(() => {
      return false
    })
    .catch((err) => {
      return err.message
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