'use client';

import { useState } from 'react';
import { User } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChatMessages } from './chat-messages';
import { ScrollArea } from '../ui/scroll-area';

interface ChatLayoutProps {
  users: User[];
}

export function ChatLayout({ users }: ChatLayoutProps) {
  const [selectedUser, setSelectedUser] = useState<User>(users[0]);

  return (
    <div className="grid grid-cols-[250px_1fr] h-[calc(100vh-4rem)]">
      <div className="border-r bg-muted/40">
        <h2 className="p-4 text-lg font-semibold">Conversations</h2>
        <ScrollArea className="h-full">
            <div className="flex flex-col">
            {users.map((user) => (
                <button
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={cn(
                    'flex items-center gap-3 p-3 text-left hover:bg-accent hover:text-accent-foreground',
                    selectedUser.id === user.id && 'bg-accent text-accent-foreground'
                )}
                >
                <Avatar className="h-9 w-9">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <p className="font-semibold">{user.name}</p>
                </div>
                </button>
            ))}
            </div>
        </ScrollArea>
      </div>
      
      <ChatMessages user={selectedUser} />
    </div>
  );
}
