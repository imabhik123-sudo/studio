import { AppLayout } from '@/components/layout/app-layout';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SprintsPage() {
  return (
    <AppLayout>
      <div className="flex flex-col h-full bg-background">
        <Header title="Sprints" />
        <main className="flex-1 p-6">
          <Card>
            <CardHeader>
              <CardTitle>Sprint Board</CardTitle>
              <CardDescription>Coming Soon: Plan, execute, and track your sprints here.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>This is where the sprint board with columns for task statuses will be displayed.</p>
            </CardContent>
          </Card>
        </main>
      </div>
    </AppLayout>
  );
}
