
import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Avatar, 
  Chip, 
  Button, 
  IconButton 
} from '@mui/material';
import { Menu as MenuIcon, Logout } from '@mui/icons-material';

export function Header() {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between', px: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton edge="start" color="inherit">
            <MenuIcon />
          </IconButton>
          <Box>
            <Typography variant="h6" component="h1" sx={{ fontWeight: 600 }}>
              Templates
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage your dental marketing templates
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip 
            label="Online" 
            color="success" 
            variant="outlined" 
            size="small"
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                sona
              </Typography>
              <Typography variant="caption" color="text.secondary">
                sona@gmail.com
              </Typography>
            </Box>
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
              S
            </Avatar>
          </Box>
          <Button 
            variant="outlined" 
            color="error" 
            size="small"
            startIcon={<Logout />}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
