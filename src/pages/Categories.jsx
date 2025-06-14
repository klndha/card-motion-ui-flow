
import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Container, Box, Typography } from '@mui/material';

const Categories = () => {
  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Box sx={{ py: 3 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
            Categories
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your template categories
          </Typography>
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default Categories;
