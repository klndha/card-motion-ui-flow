
import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Container, Box, Typography } from '@mui/material';

const Settings = () => {
  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Box sx={{ py: 3 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
            Settings
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Configure your application settings
          </Typography>
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default Settings;
