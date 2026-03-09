'use client';
import { User, ChatMessage } from '@/lib/types';
import { getChatsForCurrentUser, currentUser } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Paperclip, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, isToday } from 'date-fns';
import { ScrollArea } from '../ui/scroll-area';
import { useEffect, useRef } from 'react';

interface ChatMessagesProps {
  user: User;
}

export function ChatMessages({ user }: ChatMessagesProps) {
    const allChats = getChatsForCurrentUser();
    const messages = allChats[user.id] || [];
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollAreaRef.current) {
             const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
            if (viewport) {
                viewport.scrollTop = viewport.scrollHeight;
            }
        }
    }, [messages]);


  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    if (isToday(date)) {
      return format(date, 'p');
    }
    return format(date, 'MMM d, p');
  };

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center gap-3 p-4 border-b">
        <Avatar>
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h2 className="text-lg font-semibold">{user.name}</h2>
      </header>

      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={cn(
                'flex items-end gap-2',
                message.sender.id === currentUser.id ? 'justify-end' : 'justify-start'
              )}
            >
              {message.sender.id !== currentUser.id && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={message.sender.avatarUrl} alt={message.sender.name} />
                  <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-md rounded-lg p-3',
                  message.sender.id === currentUser.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                <p className="text-sm">{message.content}</p>
                 <p className={cn(
                     "text-xs mt-1",
                     message.sender.id === currentUser.id ? "text-primary-foreground/70" : "text-muted-foreground"
                     )}>
                    {formatTimestamp(message.createdAt)}
                </p>
              </div>
               {message.sender.id === currentUser.id && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                  <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <footer className="p-4 border-t">
        <div className="relative">
          <Input
            placeholder="Type a message..."
            className="pr-24"
          />
          <div className="absolute top-1/2 right-2 -translate-y-1/2 flex items-center gap-1">
             <Button variant="ghost" size="icon" className="rounded-full">
                <Paperclip className="h-5 w-5" />
             </Button>
             <Button size="icon" className="rounded-full">
                <Send className="h-5 w-5" />
             </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
