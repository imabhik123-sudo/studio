import { AppLayout } from '@/components/layout/app-layout';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function BacklogPage() {
  return (
    <AppLayout>
      <div className="flex flex-col h-full bg-background">
        <Header title="Backlog" />
        <main className="flex-1 p-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Backlog</CardTitle>
              <CardDescription>Coming Soon: Manage and prioritize your product backlog here.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This area will contain the list of backlog items, ready to be prioritized and pulled into sprints.</p>
            </CardContent>
          </Card>
        </main>
      </div>
    </AppLayout>
  );
}
