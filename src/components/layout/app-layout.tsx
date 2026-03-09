'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
import { currentUser, navLinks, settingsLink } from '@/lib/data';
import { Logo } from '@/components/icons/logo';
import { Separator } from '@/components/ui/separator';
import { Button } from '../ui/button';
import { Bell, LogOut } from 'lucide-react';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

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
                      src={currentUser.avatarUrl}
                      alt={currentUser.name}
                      data-ai-hint="woman portrait"
                    />
                    <AvatarFallback>
                      {currentUser.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="overflow-hidden transition-all duration-300 group-data-[collapsible=offcanvas]:hidden group-data-[collapsible=icon]:w-0">
                    <p className="text-sm font-medium text-sidebar-foreground truncate">
                      {currentUser.name}
                    </p>
                    <p className="text-xs text-sidebar-foreground/70 truncate">
                      Product Manager
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
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
