import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

import { FIREBASE_CONFIG } from 'shared/config';

const firebase = initializeApp(FIREBASE_CONFIG);

export const auth = getAuth(firebase);

export const firestore = getFirestore(firebase);
enableIndexedDbPersistence(firestore);
