import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDyndu_NzFaWL4nRsonY0ONWk7-5k8mja4',
  authDomain: 'store-db-9d14b.firebaseapp.com',
  projectId: 'store-db-9d14b',
  storageBucket: 'store-db-9d14b.appspot.com',
  messagingSenderId: '629120736789',
  appId: '1:629120736789:web:b6ed3b2db030e90dcbb81c',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAd = new Date();
    try {
      await setDoc(userDocRef, { displayName, email, createdAd });
    } catch (error) {
      console.log('Error creating the user', error.message);
    }
  }
  return userDocRef;
};
