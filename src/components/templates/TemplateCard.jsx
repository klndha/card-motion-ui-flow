
import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  IconButton,
  Box,
  Avatar
} from '@mui/material';
import { Visibility, Delete, Message } from '@mui/icons-material';

const statusColors = {
  APPROVED: { color: 'success', label: 'Approved' },
  PENDING: { color: 'warning', label: 'Pending' },
  DRAFT: { color: 'default', label: 'Draft' }
};

export function TemplateCard({ template, onView, onDelete }) {
  const statusConfig = statusColors[template.status] || statusColors.DRAFT;

  const handleView = () => {
    onView(template.id);
  };

  const handleDelete = () => {
    onDelete(template.id);
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.light' }}>
              <Message fontSize="small" />
            </Avatar>
            <Box>
              <Typography variant="h6" component="h3" sx={{ fontSize: '1rem', fontWeight: 600 }}>
                {template.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {template.category}
              </Typography>
            </Box>
          </Box>
          <Chip 
            label={statusConfig.label}
            color={statusConfig.color}
            size="small"
            variant="outlined"
          />
        </Box>
        
        <Typography variant="body2" color="text.secondary">
          Language: <strong>{template.language}</strong>
        </Typography>
      </CardContent>
      
      <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
        <IconButton 
          size="small" 
          onClick={handleView}
          sx={{ color: 'primary.main' }}
        >
          <Visibility fontSize="small" />
        </IconButton>
        <IconButton 
          size="small" 
          onClick={handleDelete}
          sx={{ color: 'error.main' }}
        >
          <Delete fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
}
