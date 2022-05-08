import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
  UserCredential,
  Unsubscribe,
} from 'firebase/auth';

import { auth } from '../firebase';

import { SignInRequest, SignUpRequest, Viewer } from './model';

const googleProvider = new GoogleAuthProvider();

export function signUpWithEmail(data: SignUpRequest): Promise<UserCredential> {
  return createUserWithEmailAndPassword(auth, data.email, data.password);
}

export function signInWithEmail(data: SignInRequest): Promise<UserCredential> {
  return signInWithEmailAndPassword(auth, data.email, data.password);
}

export function signInWithGoogle(): Promise<UserCredential> {
  return signInWithPopup(auth, googleProvider);
}

export function signOut(): Promise<void> {
  return auth.signOut();
}

export function checkAuthStatus(callback: (user: Viewer | null) => void): Unsubscribe {
  return onAuthStateChanged(auth, callback);
}
