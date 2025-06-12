
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TemplateGrid } from '@/components/templates/TemplateGrid';

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Template Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage and organize your dental marketing templates with ease
          </p>
        </div>
        
        <TemplateGrid />
      </div>
    </DashboardLayout>
  );
};

export default Index;
