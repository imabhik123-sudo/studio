'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { Header } from '@/components/layout/header';
import { MyTasks } from '@/components/dashboard/my-tasks';
import { SprintOverview } from '@/components/dashboard/sprint-overview';
import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { BurndownChartCard } from '@/components/dashboard/burndown-chart-card';
import { useUser } from '@/firebase';

export default function DashboardPage() {
  const { user } = useUser();
  return (
    <AppLayout>
      <div className="flex flex-col h-full bg-background">
        <Header title="Dashboard" />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-4">
              <h2 className="text-2xl font-headline font-bold text-foreground mb-4">
                Welcome back, {user?.name || 'User'}!
              </h2>
            </div>

            <SprintOverview className="lg:col-span-2" />
            <MyTasks className="lg:col-span-2" />
            <BurndownChartCard className="lg:col-span-3" />
            <ActivityFeed className="lg:col-span-1" />
          </div>
        </main>
      </div>
    </AppLayout>
  );
}
