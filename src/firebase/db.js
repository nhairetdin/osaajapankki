import { firebase } from './firebase'

const db = firebase.firestore()

db.settings({
  timestampsInSnapshots: true
})

export const getPersonalData = async () => {
  const email = firebase.auth().currentUser.email
  const data = await db.collection('users').doc(email).get()
  return data.data()
}

export const getArtists = async () => {
  let result = []

  try {
    await db.collection('users')
      .where('flag_artist', '==', true)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          result = [ ...result, doc.data() ]
        })
      })
    return result
  } catch (error) {
    return false
  }
}

/////////////////////////////// ADMIN ////////////////////////////////
export const addNewUserToDatabase = async (user) => {
  const newUser = { 
    ...user, 
    flag_authorized: true, 
    flag_artist: true
  }

  try {
    await db.collection('users').doc(newUser.email).set(newUser)
    return true
  } catch (error) {
    return false
  }
}

export const removeUserFromDatabase = async (useremail) => {
  try {
    const userRef = db.collection('users').doc(useremail)
    const documentSnapshot = await userRef.get()
    if (documentSnapshot.exists) {
      await userRef.delete()
      return useremail
    } else {
      console.log("user not found")
      return false// user not found
    }
  } catch (error) {
    console.log(error)
    return false
  }
}