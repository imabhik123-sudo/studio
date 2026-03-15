import { Suspense } from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { Header } from '@/components/layout/header';
import { TasksPageContent } from '@/components/tasks/tasks-page-content';
import { Skeleton } from '@/components/ui/skeleton';

function TasksPageLoading() {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-4">
        <Skeleton className="h-10 w-64" />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-[70vh] w-full" />
        <Skeleton className="h-[70vh] w-full" />
        <Skeleton className="h-[70vh] w-full" />
        <Skeleton className="h-[70vh] w-full" />
      </div>
    </div>
  );
}

export default function TasksPage() {
  return (
    <AppLayout>
      <div className="flex h-full flex-col bg-background">
        <Header title="Tasks" />
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <Suspense fallback={<TasksPageLoading />}>
            <TasksPageContent />
          </Suspense>
        </main>
      </div>
    </AppLayout>
  );
}
