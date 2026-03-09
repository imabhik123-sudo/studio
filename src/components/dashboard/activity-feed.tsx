import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { activities } from '@/lib/data';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';

export function ActivityFeed({ className }: { className?: string }) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Activity Feed</CardTitle>
        <CardDescription>Recent updates from your team.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-6">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={activity.user.avatarUrl} alt={activity.user.name} />
                  <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm">
                    <span className="font-semibold">{activity.user.name}</span>{' '}
                    {activity.action}{' '}
                    <span className="font-semibold text-primary">{activity.target}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(activity.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
