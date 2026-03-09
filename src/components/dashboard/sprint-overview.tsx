'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { currentSprint } from '@/lib/data';
import { cn } from '@/lib/utils';
import { differenceInDays, format } from 'date-fns';
import { Flag, Target } from 'lucide-react';
import { useTasks } from '@/context/TaskProvider';

export function SprintOverview({ className }: { className?: string }) {
  const { tasks } = useTasks();
  const sprintTasks = tasks.filter((task) => task.sprintId === currentSprint.id);

  const completedTasks = sprintTasks.filter(
    (task) => task.status === 'Done'
  ).length;
  const totalTasks = sprintTasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const daysRemaining = differenceInDays(new Date(currentSprint.endDate), new Date());

  return (
    <Card className={cn('h-full', className)}>
      <CardHeader>
        <CardTitle>{currentSprint.name}</CardTitle>
        <CardDescription>
          {format(new Date(currentSprint.startDate), 'MMM d')} -{' '}
          {format(new Date(currentSprint.endDate), 'MMM d, yyyy')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3 text-sm">
          <Target className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
          <p className="text-muted-foreground">{currentSprint.goal}</p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Sprint Progress</span>
            <span className="text-sm font-bold">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} />
          <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
            <span>{`${completedTasks} / ${totalTasks} tasks completed`}</span>
            <div className="flex items-center">
              <Flag className="h-3 w-3 mr-1" />
              <span>{`${daysRemaining > 0 ? daysRemaining : 0} days left`}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
