
import React from 'react';
import { Box } from '@mui/material';
import { SidebarProvider } from '../ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { Header } from './Header';

export function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <AppSidebar />
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Header />
          <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: 'grey.50' }}>
            {children}
          </Box>
        </Box>
      </Box>
    </SidebarProvider>
  );
}
