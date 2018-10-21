import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyBwWHwl06yULGjsIJCEnyMSBLJv8U5X4uA",
  authDomain: "osaajapankki2.firebaseapp.com",
  databaseURL: "https://osaajapankki2.firebaseio.com",
  projectId: "osaajapankki2",
  storageBucket: "osaajapankki2.appspot.com",
  messagingSenderId: "284481593658"
}

if (!firebase.apps.length) {
  console.log('initialising firebase..')
  firebase.initializeApp(config)
}

export {
  firebase
}