
import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Container, Box, Typography } from '@mui/material';

const Analytics = () => {
  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Box sx={{ py: 3 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
            Analytics
          </Typography>
          <Typography variant="body1" color="text.secondary">
            View your template performance analytics
          </Typography>
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default Analytics;
