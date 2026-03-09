import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { currentUser, tasks } from '@/lib/data';
import { TaskPriorityIcon } from '../tasks/task-priority-icon';
import { TaskStatusBadge } from '../tasks/task-status-badge';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MyTasks({ className }: { className?: string }) {
  const myTasks = tasks
    .filter((task) => task.assignee?.id === currentUser.id)
    .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
    .slice(0, 5);

  return (
    <Card className={cn('h-full', className)}>
      <CardHeader>
        <CardTitle>My Tasks</CardTitle>
        <CardDescription>A quick look at your assigned tasks.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Task</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  <TaskPriorityIcon priority={task.priority} />
                </TableCell>
                <TableCell>
                  <div className="font-medium">{task.title}</div>
                  <div className="text-sm text-muted-foreground">{task.id}</div>
                </TableCell>
                <TableCell>
                  <TaskStatusBadge status={task.status} />
                </TableCell>
                <TableCell>
                  {task.dueDate
                    ? formatDistanceToNow(new Date(task.dueDate), {
                        addSuffix: true,
                      })
                    : 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button variant="link" className="mt-4 px-0">
          View all my tasks <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
