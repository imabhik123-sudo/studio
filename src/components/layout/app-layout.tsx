'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { navLinks, settingsLink } from '@/lib/data';
import { Logo } from '@/components/icons/logo';
import { Separator } from '@/components/ui/separator';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';
import { useUser } from '@/firebase';
import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { Skeleton } from '../ui/skeleton';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading } = useUser();
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);
  
  const handleLogout = async () => {
    const auth = getAuth();
    await auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
        <div className="flex min-h-screen">
            <div className="p-4">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="space-y-2 mt-4">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-8 w-48" />
                </div>
            </div>
            <main className="flex-1 p-6">
                <Skeleton className="h-full w-full" />
            </main>
        </div>
    )
  }

  if (!user) {
    return null; // or a redirect, though useEffect handles it.
  }

  const displayName = user.name;
  const avatarUrl = user.avatarUrl;
  const avatarFallback = displayName.charAt(0).toUpperCase();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar
          variant="sidebar"
          collapsible="icon"
          className="group-data-[collapsible=icon]:border-r"
        >
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Logo className="h-6 w-6" />
              </div>
              <div className="overflow-hidden transition-all duration-300 group-data-[collapsible=offcanvas]:hidden group-data-[collapsible=icon]:w-0">
                <h2 className="font-headline text-lg font-bold text-sidebar-foreground">
                  SprintFlow Pro
                </h2>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="flex-1 p-2">
            <SidebarMenu>
              {navLinks.map((link) => (
                <SidebarMenuItem key={link.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === link.href}
                    tooltip={{
                      children: link.label,
                      className: 'bg-sidebar-background text-sidebar-foreground',
                    }}
                  >
                    <Link href={link.href}>
                      <link.icon />
                      <span>{link.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <Separator className="my-2 bg-sidebar-border" />
          <SidebarFooter className="p-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === settingsLink.href}
                  tooltip={{
                    children: settingsLink.label,
                    className: 'bg-sidebar-background text-sidebar-foreground',
                  }}
                >
                  <Link href={settingsLink.href}>
                    <settingsLink.icon />
                    <span>{settingsLink.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <div className="p-2 flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={avatarUrl}
                      alt={displayName}
                      data-ai-hint="woman portrait"
                    />
                    <AvatarFallback>
                      {avatarFallback}
                    </AvatarFallback>
                  </Avatar>
                  <div className="overflow-hidden transition-all duration-300 group-data-[collapsible=offcanvas]:hidden group-data-[collapsible=icon]:w-0">
                    <p className="text-sm font-medium text-sidebar-foreground truncate">
                      {displayName}
                    </p>
                    <p className="text-xs text-sidebar-foreground/70 truncate">
                      Product Manager
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    className="ml-auto text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent group-data-[collapsible=offcanvas]:hidden group-data-[collapsible=icon]:w-0"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="bg-background min-h-screen">
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
