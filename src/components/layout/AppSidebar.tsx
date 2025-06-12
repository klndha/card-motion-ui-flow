
import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { 
  Square,
  Circle,
  Triangle,
  Star
} from 'lucide-react';

const navigationItems = [
  { title: 'Templates', url: '/', icon: Square, active: true },
  { title: 'Categories', url: '/categories', icon: Circle },
  { title: 'Analytics', url: '/analytics', icon: Triangle },
  { title: 'Settings', url: '/settings', icon: Star },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className={`${open ? 'w-64' : 'w-16'} bg-sidebar-background border-r border-sidebar-border`}>
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">C</span>
          </div>
          {open && (
            <span className="text-sidebar-foreground font-semibold text-lg">construct730</span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 text-xs uppercase tracking-wide mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Button
                      variant={isActive(item.url) ? "secondary" : "ghost"}
                      className={`w-full justify-start h-10 sidebar-item ${
                        isActive(item.url) 
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                          : 'text-sidebar-foreground hover:text-sidebar-accent-foreground'
                      }`}
                    >
                      <item.icon className={`h-4 w-4 ${open ? 'mr-3' : ''}`} />
                      {open && <span>{item.title}</span>}
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
