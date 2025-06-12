
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TemplateCard } from './TemplateCard';
import { SearchAndFilters } from './SearchAndFilters';
import { useNavigate } from 'react-router-dom';

// Mock data for templates
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
  const [templates] = useState(mockTemplates);
  const [filteredTemplates, setFilteredTemplates] = useState(mockTemplates);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const navigate = useNavigate();

  const handleSearchChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    filterTemplates(searchTerm, selectedCategory, selectedStatus);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterTemplates(searchTerm, category, selectedStatus);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    filterTemplates(searchTerm, selectedCategory, status);
  };

  const filterTemplates = (search: string, category: string, status: string) => {
    let filtered = templates;
    
    if (search) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(search.toLowerCase()) ||
        template.category.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (category !== 'ALL') {
      filtered = filtered.filter(template => template.category === category);
    }
    
    if (status !== 'ALL') {
      filtered = filtered.filter(template => template.status === status);
    }
    
    setFilteredTemplates(filtered);
  };

  const handleCreateTemplate = () => {
    navigate('/create-template');
  };

  const handleViewTemplate = () => {
    console.log('Viewing template');
  };

  const handleDeleteTemplate = () => {
    console.log('Deleting template');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Marketing Templates</h2>
          <p className="text-muted-foreground">
            Create and manage your dental marketing campaigns
          </p>
        </div>
        <Button onClick={handleCreateTemplate} className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Create Template
        </Button>
      </div>

      <SearchAndFilters 
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
        totalCount={filteredTemplates.length}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onView={handleViewTemplate}
            onDelete={handleDeleteTemplate}
          />
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No templates found</p>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
