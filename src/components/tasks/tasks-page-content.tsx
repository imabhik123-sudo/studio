'use client';

import { useSearchParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { users, sprints } from '@/lib/data';
import type { Task, TaskStatus } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTasks } from '@/context/TaskProvider';

const statusColumns: TaskStatus[] = ['Backlog', 'To Do', 'In Progress', 'Done'];

function TasksByStatusView({ tasks }: { tasks: Task[] }) {
  const getTasksByStatus = (status: TaskStatus) =>
    tasks.filter((task) => task.status === status);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statusColumns.map((status) => (
        <div key={status} className="flex flex-col">
          <h3 className="mb-4 px-1 text-lg font-semibold">
            {status} ({getTasksByStatus(status).length})
          </h3>
          <ScrollArea className="h-full min-h-[60vh] rounded-lg bg-muted/50 p-4">
            <div className="space-y-4">
              {getTasksByStatus(status).map((task) => (
                <Card key={task.id} className="bg-card">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">{task.title}</CardTitle>
                    <CardDescription>{task.id}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {task.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
              {getTasksByStatus(status).length === 0 && (
                <div className="flex h-24 items-center justify-center text-muted-foreground">
                  No tasks in this status.
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      ))}
    </div>
  );
}

function TasksByUserView({ tasks }: { tasks: Task[] }) {
  return (
    <div className="space-y-6">
      {users.map((user) => (
        <div key={user.id}>
          <div className="mb-4 flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-semibold">{user.name}</h3>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tasks
              .filter((task) => task.assignee?.id === user.id)
              .map((task) => (
                <Card key={task.id}>
                  <CardHeader>
                    <CardTitle className="text-base">{task.title}</CardTitle>
                    <CardDescription>{task.id}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {task.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            {tasks.filter((task) => task.assignee?.id === user.id).length ===
              0 && (
              <div className="col-span-full">
                <p className="text-muted-foreground">No tasks assigned.</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function TasksBySprintView({ tasks }: { tasks: Task[] }) {
  return (
    <div className="space-y-6">
      {sprints.map((sprint) => (
        <div key={sprint.id}>
          <h3 className="mb-2 text-lg font-semibold">{sprint.name}</h3>
          <p className="mb-4 text-sm text-muted-foreground">{sprint.goal}</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tasks
              .filter((task) => task.sprintId === sprint.id)
              .map((task) => (
                <Card key={task.id}>
                  <CardHeader>
                    <CardTitle className="text-base">{task.title}</CardTitle>
                    <CardDescription>{task.id}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {task.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            {tasks.filter((task) => task.sprintId === sprint.id).length ===
              0 && (
              <div className="col-span-full">
                <p className="text-muted-foreground">No tasks in this sprint.</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export function TasksPageContent() {
  const searchParams = useSearchParams();
  const sprintId = searchParams.get('sprint');
  const defaultTab = sprintId ? 'sprint' : 'status';
  const { tasks } = useTasks();

  return (
    <Tabs defaultValue={defaultTab} className="flex h-full flex-col">
      <TabsList className="mb-4">
        <TabsTrigger value="status">By Status</TabsTrigger>
        <TabsTrigger value="user">By User</TabsTrigger>
        <TabsTrigger value="sprint">By Sprint</TabsTrigger>
      </TabsList>
      <TabsContent value="status" className="flex-1">
        <TasksByStatusView tasks={tasks} />
      </TabsContent>
      <TabsContent value="user" className="flex-1">
        <TasksByUserView tasks={tasks} />
      </TabsContent>
      <TabsContent value="sprint" className="flex-1">
        <TasksBySprintView tasks={tasks} />
      </TabsContent>
    </Tabs>
  );
}
