
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CreateTemplateForm } from '@/components/templates/CreateTemplateForm';

const CreateTemplate = () => {
  return (
    <DashboardLayout>
      <CreateTemplateForm />
    </DashboardLayout>
  );
};

export default CreateTemplate;
