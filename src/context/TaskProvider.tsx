'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Task, TaskStatus, TaskPriority } from '@/lib/types';
import { tasks as initialTasks, users } from '@/lib/data';
import { useUser } from '@/firebase';

export interface AddTaskData {
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    assigneeId?: string;
    dueDate?: string;
    sprintId?: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (taskData: AddTaskData) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const { user: currentUser } = useUser();

  const addTask = (taskData: AddTaskData) => {
    if (!currentUser) {
      console.error("No user logged in to create a task.");
      return;
    }
    const newTask: Task = {
      ...taskData,
      id: `TASK-${Math.floor(Math.random() * 1000) + 200}`,
      createdAt: new Date().toISOString(),
      reporter: currentUser,
      assignee: taskData.assigneeId ? users.find(u => u.id === taskData.assigneeId) : undefined,
      comments: [],
      attachments: [],
      tags: [],
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}
