'use client';

import { TaskProvider } from '@/context/TaskProvider';
import { ReactNode } from 'react';
import { FirebaseClientProvider } from '@/firebase/client-provider';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <FirebaseClientProvider>
      <TaskProvider>{children}</TaskProvider>
    </FirebaseClientProvider>
  );
}
