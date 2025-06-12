
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CreateTemplateForm } from '@/components/templates/CreateTemplateForm';

const CreateTemplate = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <CreateTemplateForm />
      </div>
    </DashboardLayout>
  );
};

export default CreateTemplate;
