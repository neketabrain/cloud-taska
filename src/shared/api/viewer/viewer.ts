import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
} from 'firebase/auth';

import { auth } from '../firebase';

import { SignInRequest, SignUpRequest, Viewer } from './model';

const googleProvider = new GoogleAuthProvider();

export function signUpWithEmail(data: SignUpRequest) {
  return createUserWithEmailAndPassword(auth, data.email, data.password);
}

export function signInWithEmail(data: SignInRequest) {
  return signInWithEmailAndPassword(auth, data.email, data.password);
}

export function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export function signOut() {
  return auth.signOut();
}

export function checkAuthStatus(callback: (user: Viewer | null) => void) {
  return onAuthStateChanged(auth, callback);
}
