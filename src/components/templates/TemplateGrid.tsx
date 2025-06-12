
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
    category: 'Email Marketing',
    status: 'Active',
    lastModified: '2 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=300&h=200&fit=crop',
    description: 'A professional reminder template for routine dental checkups'
  },
  {
    id: '2', 
    name: 'Teeth Whitening Promotion',
    category: 'SMS Marketing',
    status: 'Draft',
    lastModified: '1 day ago',
    thumbnail: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=300&h=200&fit=crop',
    description: 'Special offer template for teeth whitening services'
  },
  {
    id: '3',
    name: 'New Patient Welcome',
    category: 'Email Marketing', 
    status: 'Active',
    lastModified: '3 days ago',
    thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop',
    description: 'Welcome message for new dental practice patients'
  },
  {
    id: '4',
    name: 'Appointment Confirmation',
    category: 'SMS Marketing',
    status: 'Active', 
    lastModified: '5 days ago',
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
    description: 'Automated confirmation message for scheduled appointments'
  }
];

export function TemplateGrid() {
  const [templates] = useState(mockTemplates);
  const [filteredTemplates, setFilteredTemplates] = useState(mockTemplates);
  const navigate = useNavigate();

  const handleSearch = (searchTerm: string) => {
    const filtered = templates.filter(template =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTemplates(filtered);
  };

  const handleFilter = (category: string, status: string) => {
    let filtered = templates;
    
    if (category !== 'all') {
      filtered = filtered.filter(template => template.category === category);
    }
    
    if (status !== 'all') {
      filtered = filtered.filter(template => template.status === status);
    }
    
    setFilteredTemplates(filtered);
  };

  const handleCreateTemplate = () => {
    navigate('/create-template');
  };

  const handleEditTemplate = (templateId: string) => {
    console.log('Editing template:', templateId);
    navigate(`/edit-template/${templateId}`);
  };

  const handleDuplicateTemplate = (templateId: string) => {
    console.log('Duplicating template:', templateId);
  };

  const handleDeleteTemplate = (templateId: string) => {
    console.log('Deleting template:', templateId);
  };

  const handleViewTemplate = (templateId: string) => {
    console.log('Viewing template:', templateId);
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

      <SearchAndFilters onSearch={handleSearch} onFilter={handleFilter} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onEdit={handleEditTemplate}
            onDuplicate={handleDuplicateTemplate}
            onDelete={handleDeleteTemplate}
            onView={handleViewTemplate}
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
