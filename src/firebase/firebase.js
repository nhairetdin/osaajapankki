import firebase from 'firebase'
import config from './config'

if (!firebase.apps.length) {
  console.log('initialising firebase..')
  firebase.initializeApp(config)
}

export {
  firebase
}