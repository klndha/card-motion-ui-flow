
import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export function Header() {
  return (
    <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="h-8 w-8" />
        <div>
          <h1 className="text-xl font-semibold">Templates</h1>
          <p className="text-sm text-muted-foreground">Manage your dental marketing templates</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Badge variant="secondary" className="bg-success/10 text-success hover:bg-success/20">
          Online
        </Badge>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium">sona</p>
            <p className="text-xs text-muted-foreground">sona@gmail.com</p>
          </div>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">S</AvatarFallback>
          </Avatar>
        </div>
        <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
          Logout
        </Button>
      </div>
    </header>
  );
}
