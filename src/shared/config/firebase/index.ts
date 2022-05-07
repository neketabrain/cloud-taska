import { getEnvVariable } from 'shared/lib';

export const FIREBASE_CONFIG = {
  apiKey: getEnvVariable('REACT_APP_FIREBASE_API_KEY'),
  authDomain: getEnvVariable('REACT_APP_FIREBASE_AUTH_DOMAIN'),
  projectId: getEnvVariable('REACT_APP_FIREBASE_PROJECT_ID'),
  storageBucket: getEnvVariable('REACT_APP_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnvVariable('REACT_APP_FIREBASE_MESSAGING_SENDER_ID'),
  appId: getEnvVariable('REACT_APP_FIREBASE_APP_ID'),
  measurementId: getEnvVariable('REACT_APP_FIREBASE_MEASUREMENT_ID'),
};
