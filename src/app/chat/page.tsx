import { AppLayout } from '@/components/layout/app-layout';
import { Header } from '@/components/layout/header';
import { ChatLayout } from '@/components/chat/chat-layout';
import { users, currentUser } from '@/lib/data';

export default function ChatPage() {
    const otherUsers = users.filter(user => user.id !== currentUser.id);
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
