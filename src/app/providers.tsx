'use client';

import { TaskProvider } from '@/context/TaskProvider';
import { ReactNode } from 'react';

export function AppProviders({ children }: { children: ReactNode }) {
  return <TaskProvider>{children}</TaskProvider>;
}
