import { TaskPriority } from '@/lib/types';
import { cn } from '@/lib/utils';
import {
  ArrowDown,
  ArrowUp,
  ChevronsUp,
  Minus,
} from 'lucide-react';

type TaskPriorityIconProps = {
  priority: TaskPriority;
  className?: string;
};

const priorityMap = {
  Urgent: {
    icon: ChevronsUp,
    className: 'text-red-500',
  },
  High: {
    icon: ArrowUp,
    className: 'text-orange-500',
  },
  Medium: {
    icon: Minus,
    className: 'text-yellow-500',
  },
  Low: {
    icon: ArrowDown,
    className: 'text-green-500',
  },
};

export function TaskPriorityIcon({ priority, className }: TaskPriorityIconProps) {
  const { icon: Icon, className: colorClass } = priorityMap[priority];
  return <Icon className={cn('h-4 w-4', colorClass, className)} />;
}
