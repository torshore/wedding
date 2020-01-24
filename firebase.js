const config = {
    apiKey: process.env.GATSBY_FIREBASE_APIKEY,
    authDomain: process.env.GATSBY_FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.GATSBY_FIREBASE_DATABASEURL,
    projectId: process.env.GATSBY_FIREBASE_PROJECTID,
    storageBucket: process.env.GATSBY_FIREBASE_STORAGEBUCKET
}

let firebaseInstance
export const getFirebase = firebase => {
    console.log(process.env.GATSBY_FIREBASE_DATABASEURL)
  if (firebaseInstance) {
    return firebaseInstance
  }

  firebase.initializeApp(config)
  firebaseInstance = firebase

  return firebase
}