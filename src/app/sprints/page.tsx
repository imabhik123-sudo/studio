'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { sprints, currentSprint } from '@/lib/data';
import { format, formatISO, differenceInDays } from 'date-fns';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Sprint } from '@/lib/types';
import { useState, useEffect } from 'react';

interface SprintDetails extends Sprint {
    isCurrent: boolean;
    isPast: boolean;
    daysRemaining: number;
}


export default function SprintsPage() {
  const [sprintDetails, setSprintDetails] = useState<SprintDetails[]>([]);

  useEffect(() => {
    const today = formatISO(new Date(), { representation: 'date' });
    const details = sprints.map(sprint => {
        const isCurrent = sprint.id === currentSprint.id;
        const isPast = new Date(sprint.endDate) < new Date(today);
        const daysRemaining = differenceInDays(new Date(sprint.endDate), new Date());
        return { ...sprint, isCurrent, isPast, daysRemaining };
    });
    setSprintDetails(details);
  }, []);

  return (
    <AppLayout>
      <div className="flex flex-col h-full bg-background">
        <Header title="Sprints" />
        <main className="flex-1 p-4 sm:p-6 space-y-6">
            <h2 className="text-2xl font-headline font-bold text-foreground">All Sprints</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sprintDetails.map(sprint => {
                    return (
                        <Link href={`/backlog?sprint=${sprint.id}`} key={sprint.id}>
                            <Card className="h-full hover:shadow-lg transition-shadow duration-200 ease-in-out">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-xl">{sprint.name}</CardTitle>
                                        {sprint.isCurrent && <Badge>Current</Badge>}
                                        {sprint.isPast && !sprint.isCurrent && <Badge variant="secondary">Completed</Badge>}
                                    </div>
                                    <CardDescription>
                                        {format(new Date(sprint.startDate), 'MMM d')} -{' '}
                                        {format(new Date(sprint.endDate), 'MMM d, yyyy')}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{sprint.goal}</p>
                                    {sprint.isCurrent && (
                                        <p className="text-sm font-medium">{sprint.daysRemaining > 0 ? `${sprint.daysRemaining} days left` : 'Ends today'}</p>
                                    )}
                                </CardContent>
                            </Card>
                        </Link>
                    )
                })}
            </div>
        </main>
      </div>
    </AppLayout>
  );
}
