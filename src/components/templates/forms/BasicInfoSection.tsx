import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';

interface BasicInfoSectionProps {
  name: string;
  category: string;
  language: string;
  status: 'APPROVED' | 'PENDING' | 'DRAFT';
  onNameChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onLanguageChange: (value: string) => void;
  onStatusChange: (value: 'APPROVED' | 'PENDING' | 'DRAFT') => void;
}

export function BasicInfoSection({
  name,
  category,
  language,
  status,
  onNameChange,
  onCategoryChange,
  onLanguageChange,
  onStatusChange
}: BasicInfoSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Template Name</Label>
          <Input
            id="name"
            placeholder="Enter template name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            placeholder="Enter category"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="language">Language</Label>
          <Input
            id="language"
            placeholder="Enter language"
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={status}
            onChange={(e) => onStatusChange(e.target.value as 'APPROVED' | 'PENDING' | 'DRAFT')}
          >
            <option value="DRAFT">Draft</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
          </select>
        </div>
      </CardContent>
    </Card>
  );
}
