import { Badge } from '@/components/ui/badge';
import { TaskStatus } from '@/lib/types';
import { cn } from '@/lib/utils';

type TaskStatusBadgeProps = {
  status: TaskStatus;
  className?: string;
};

const statusMap: Record<
  TaskStatus,
  { text: string; className: string }
> = {
  'Backlog': {
    text: 'Backlog',
    className: 'bg-gray-200 text-gray-800 hover:bg-gray-200/80 dark:bg-gray-700 dark:text-gray-200',
  },
  'To Do': {
    text: 'To Do',
    className: 'bg-blue-100 text-primary hover:bg-blue-100/80 dark:bg-blue-900/50 dark:text-blue-300',
  },
  'In Progress': {
    text: 'In Progress',
    className:
      'bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80 dark:bg-yellow-900/50 dark:text-yellow-300',
  },
  'Done': {
    text: 'Done',
    className:
      'bg-green-100 text-green-800 hover:bg-green-100/80 dark:bg-green-900/50 dark:text-green-300',
  },
};

export function TaskStatusBadge({ status, className }: TaskStatusBadgeProps) {
  const { text, className: statusClass } = statusMap[status];

  return <Badge className={cn('border-transparent font-medium', statusClass, className)}>{text}</Badge>;
}
