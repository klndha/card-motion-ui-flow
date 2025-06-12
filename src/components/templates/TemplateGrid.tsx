
import React, { useState } from 'react';
import { TemplateCard } from './TemplateCard';
import { SearchAndFilters } from './SearchAndFilters';

const mockTemplates = [
  { id: '1', name: 'welcome_dental', category: 'MARKETING', status: 'APPROVED' as const, language: 'en_US' },
  { id: '2', name: 'whiten', category: 'MARKETING', status: 'APPROVED' as const, language: 'en_US' },
  { id: '3', name: 'straighten', category: 'MARKETING', status: 'APPROVED' as const, language: 'en_US' },
  { id: '4', name: 'cavity', category: 'MARKETING', status: 'APPROVED' as const, language: 'en_US' },
  { id: '5', name: 'teeth_whitening', category: 'MARKETING', status: 'APPROVED' as const, language: 'en_US' },
  { id: '6', name: 'tooth_pain', category: 'MARKETING', status: 'APPROVED' as const, language: 'en_US' },
  { id: '7', name: 'dental_implants', category: 'MARKETING', status: 'PENDING' as const, language: 'en_US' },
  { id: '8', name: 'orthodontics', category: 'MARKETING', status: 'DRAFT' as const, language: 'en_US' },
];

export function TemplateGrid() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  const filteredTemplates = mockTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || template.category === selectedCategory;
    const matchesStatus = selectedStatus === 'ALL' || template.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleView = (templateId: string) => {
    console.log('Viewing template:', templateId);
  };

  const handleDelete = (templateId: string) => {
    console.log('Deleting template:', templateId);
  };

  return (
    <div className="space-y-6">
      <SearchAndFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        totalCount={filteredTemplates.length}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTemplates.map((template, index) => (
          <div
            key={template.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <TemplateCard
              template={template}
              onView={() => handleView(template.id)}
              onDelete={() => handleDelete(template.id)}
            />
          </div>
        ))}
      </div>
      
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <Square className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No templates found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
