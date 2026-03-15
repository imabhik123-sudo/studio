'use client';

import { FirebaseProvider } from './provider';
import { ReactNode, useMemo } from 'react';
import { initializeFirebase } from '.';

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const services = useMemo(() => {
    const { firebaseApp, auth, firestore } = initializeFirebase();
    return { app: firebaseApp, auth, firestore };
  }, []);

  return <FirebaseProvider value={services}>{children}</FirebaseProvider>;
}
