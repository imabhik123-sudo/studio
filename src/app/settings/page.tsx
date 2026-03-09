import { AppLayout } from '@/components/layout/app-layout';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="flex flex-col h-full bg-background">
        <Header title="Settings" />
        <main className="flex-1 p-6">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Coming Soon: Manage your profile, notifications, and project settings.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>User profile settings, notification preferences, and workspace configurations will live here.</p>
            </CardContent>
          </Card>
        </main>
      </div>
    </AppLayout>
  );
}
