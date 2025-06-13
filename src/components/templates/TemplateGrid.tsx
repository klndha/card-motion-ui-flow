
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid,
  Container
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { TemplateCard } from './TemplateCard';
import { SearchAndFilters } from './SearchAndFilters';
import { useNavigate } from 'react-router-dom';

const mockTemplates = [
  {
    id: '1',
    name: 'Dental Checkup Reminder',
    category: 'MARKETING',
    status: 'APPROVED' as const,
    language: 'English (US)',
  },
  {
    id: '2', 
    name: 'Teeth Whitening Promotion',
    category: 'MARKETING',
    status: 'DRAFT' as const,
    language: 'English (US)',
  },
  {
    id: '3',
    name: 'New Patient Welcome',
    category: 'MARKETING', 
    status: 'APPROVED' as const,
    language: 'English (US)',
  },
  {
    id: '4',
    name: 'Appointment Confirmation',
    category: 'ADMIN',
    status: 'PENDING' as const,
    language: 'English (US)',
  }
];

export function TemplateGrid() {
  const [templates, setTemplates] = useState(mockTemplates);
  const [filteredTemplates, setFilteredTemplates] = useState(mockTemplates);
  const navigate = useNavigate();

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm) {
      setFilteredTemplates(templates);
      return;
    }
    
    const filtered = templates.filter(template =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTemplates(filtered);
  };

  const handleFilter = (filters: { category?: string; status?: string }) => {
    let filtered = templates;
    
    if (filters.category) {
      filtered = filtered.filter(template => template.category === filters.category);
    }
    
    if (filters.status) {
      filtered = filtered.filter(template => template.status === filters.status);
    }
    
    setFilteredTemplates(filtered);
  };

  const handleCreateTemplate = () => {
    navigate('/create-template');
  };

  const handleViewTemplate = (id: string) => {
    const template = templates.find(t => t.id === id);
    console.log(`Viewing template: ${template?.name}`);
  };

  const handleDeleteTemplate = (id: string) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      const updatedTemplates = templates.filter(t => t.id !== id);
      setTemplates(updatedTemplates);
      setFilteredTemplates(updatedTemplates);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
              Marketing Templates
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Create and manage your dental marketing campaigns
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            startIcon={<Add />}
            onClick={handleCreateTemplate}
            size="large"
          >
            Create Template
          </Button>
        </Box>

        <SearchAndFilters 
          onSearch={handleSearch}
          onFilter={handleFilter}
          categories={['MARKETING', 'ADMIN']}
          statuses={['APPROVED', 'PENDING', 'DRAFT']}
        />

        <Grid container spacing={3}>
          {filteredTemplates.map((template) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={template.id}>
              <TemplateCard
                template={template}
                onView={handleViewTemplate}
                onDelete={handleDeleteTemplate}
              />
            </Grid>
          ))}
        </Grid>

        {filteredTemplates.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              No templates found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search or filters
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}
