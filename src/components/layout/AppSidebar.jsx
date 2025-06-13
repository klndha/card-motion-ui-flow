
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar
} from '@mui/material';
import { 
  Square,
  Circle,
  Triangle,
  Star
} from '@mui/icons-material';
import { Sidebar, SidebarContent, useSidebar } from '../ui/sidebar';

const navigationItems = [
  { title: 'Templates', url: '/', icon: Square },
  { title: 'Categories', url: '/categories', icon: Circle },
  { title: 'Analytics', url: '/analytics', icon: Triangle },
  { title: 'Settings', url: '/settings', icon: Star },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (url) => {
    navigate(url);
  };

  return (
    <Sidebar>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
            C
          </Avatar>
          {open && (
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              construct730
            </Typography>
          )}
        </Box>
      </Box>

      <SidebarContent>
        <Typography variant="overline" sx={{ px: 2, py: 1, color: 'text.secondary' }}>
          Navigation
        </Typography>
        <List>
          {navigationItems.map((item) => (
            <ListItem key={item.title} disablePadding>
              <ListItemButton
                selected={isActive(item.url)}
                onClick={() => handleNavigation(item.url)}
                sx={{
                  minHeight: 40,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <item.icon />
                </ListItemIcon>
                {open && <ListItemText primary={item.title} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </SidebarContent>
    </Sidebar>
  );
}
