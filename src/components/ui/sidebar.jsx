
import * as React from "react"
import { Box, Drawer, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

const SidebarContext = React.createContext({
  open: false,
  setOpen: () => {},
});

export const useSidebar = () => React.useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  
  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({ children, className, ...props }) => {
  const { open } = useSidebar();
  
  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? 240 : 60,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? 240 : 60,
          boxSizing: 'border-box',
          transition: 'width 0.3s',
          overflowX: 'hidden',
        },
      }}
      {...props}
    >
      {children}
    </Drawer>
  );
};

export const SidebarContent = ({ children, className, ...props }) => (
  <Box sx={{ p: 1, display: 'flex', flexDirection: 'column', height: '100%' }} {...props}>
    {children}
  </Box>
);

export const SidebarTrigger = ({ className, ...props }) => {
  const { open, setOpen } = useSidebar();
  
  return (
    <IconButton onClick={() => setOpen(!open)} {...props}>
      <MenuIcon />
    </IconButton>
  );
};
