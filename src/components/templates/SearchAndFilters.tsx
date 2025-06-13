
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton
} from '@mui/material';
import { Search, Filter, Clear } from '@mui/icons-material';

interface SearchAndFiltersProps {
  onSearch: (searchTerm: string) => void;
  onFilter: (filters: { category?: string; status?: string }) => void;
  categories?: string[];
  statuses?: string[];
}

export function SearchAndFilters({ 
  onSearch, 
  onFilter, 
  categories = ['MARKETING', 'ADMIN'], 
  statuses = ['APPROVED', 'PENDING', 'DRAFT'] 
}: SearchAndFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleCategoryChange = (e: any) => {
    setCategoryFilter(e.target.value);
  };

  const handleStatusChange = (e: any) => {
    setStatusFilter(e.target.value);
  };

  const applyFilters = () => {
    onFilter({ category: categoryFilter, status: statusFilter });
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    setCategoryFilter('');
    setStatusFilter('');
    onFilter({});
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          placeholder="Search templates..."
          value={searchTerm}
          onChange={handleSearchChange}
          variant="outlined"
          size="small"
          sx={{ flex: 1 }}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
            endAdornment: searchTerm && (
              <IconButton
                size="small"
                onClick={() => {
                  setSearchTerm('');
                  onSearch('');
                }}
              >
                <Clear />
              </IconButton>
            )
          }}
        />
        <Button
          variant="outlined"
          startIcon={<Filter />}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          Filter
        </Button>
      </Box>

      {isFilterOpen && (
        <Paper sx={{ p: 3, mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Filter Templates
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Category</InputLabel>
                <Select
                  value={categoryFilter}
                  onChange={handleCategoryChange}
                  label="Category"
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  onChange={handleStatusChange}
                  label="Status"
                >
                  <MenuItem value="">All Statuses</MenuItem>
                  {statuses.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
            <Button variant="text" onClick={clearFilters}>
              Clear
            </Button>
            <Button variant="contained" onClick={applyFilters}>
              Apply
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
}
