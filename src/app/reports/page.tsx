import { AppLayout } from '@/components/layout/app-layout';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ReportsPage() {
  return (
    <AppLayout>
      <div className="flex flex-col h-full bg-background">
        <Header title="Reports" />
        <main className="flex-1 p-6">
          <Card>
            <CardHeader>
              <CardTitle>Analytics & Reports</CardTitle>
              <CardDescription>Coming Soon: View sprint analytics and team performance reports.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This section will feature charts and metrics like velocity, burn-down/burn-up charts, and cycle times.</p>
            </CardContent>
          </Card>
        </main>
      </div>
    </AppLayout>
  );
}
