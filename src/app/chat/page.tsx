'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { Header } from '@/components/layout/header';
import { ChatLayout } from '@/components/chat/chat-layout';
import { users } from '@/lib/data';
import { useUser } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';


export default function ChatPage() {
  const { user: currentUser, loading } = useUser();

  if (loading) {
    return (
      <AppLayout>
        <div className="flex flex-col h-full bg-background">
          <Header title="Chat" />
          <main className="flex-1 p-4">
            <Skeleton className="h-[calc(100vh-6rem)] w-full" />
          </main>
        </div>
      </AppLayout>
    )
  }

  const otherUsers = currentUser ? users.filter(user => user.id !== currentUser.id) : users;

  return (
    <AppLayout>
      <div className="flex flex-col h-full bg-background">
        <Header title="Chat" />
        <main className="flex-1">
          <ChatLayout users={otherUsers} />
        </main>
      </div>
    </AppLayout>
  );
}
