import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import { Separator } from '@/components/Separator';
import { Badge } from '@/components/Badge';
import { Progress } from '@/components/Progress';
import { BasicInfoSection } from './forms/BasicInfoSection';
import { VariableManager } from './forms/VariableManager';
import { 
  Save, 
  Eye, 
  Send,
  Type,
  Image as ImageIcon,
  Link,
  Plus,
  Minus,
  Copy,
  Trash2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CreateTemplateFormProps {
  onSubmit: (data: any) => void;
  onPreview: (data: any) => void;
  onSendForApproval: (id: string) => void;
}

export const CreateTemplateForm: React.FC<CreateTemplateFormProps> = ({ onSubmit, onPreview, onSendForApproval }) => {
  const { toast } = useToast();
  const [templateData, setTemplateData] = useState({
    name: '',
    category: '',
    language: 'English',
    content: '',
    variables: []
  });
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTemplateData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleVariableChange = (variables: any[]) => {
    setTemplateData(prevData => ({
      ...prevData,
      variables: variables
    }));
  };

  const handleSubmit = () => {
    onSubmit(templateData);
    toast({
      title: "Template Saved",
      description: `Your template "${templateData.name}" has been saved.`,
    });
  };

  const handlePreview = () => {
    onPreview(templateData);
    toast({
      title: "Template Previewed",
      description: `Previewing template: ${templateData.name}`,
    });
  };

  const handleSendForApproval = () => {
    onSendForApproval("template123"); // Placeholder ID
    toast({
      title: "Template Sent for Approval",
      description: `Template "${templateData.name}" sent for approval.`,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          toast({
            title: "File Uploaded",
            description: `${file.name} has been successfully uploaded.`,
          });
        }
      }, 100);
    }
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Create New Template</CardTitle>
            <div className="flex items-center gap-3">
              <Badge variant="secondary">
                Draft
              </Badge>
              <Button variant="outline" size="icon" onClick={handlePreview}>
                <Eye className="h-4 w-4" />
              </Button>
              <Button size="icon" onClick={handleSubmit}>
                <Save className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">

          <BasicInfoSection 
            templateData={templateData}
            handleInputChange={handleInputChange}
          />

          <Separator />

          <VariableManager 
            variables={templateData.variables}
            onVariableChange={handleVariableChange}
          />

          <Separator />

          <div>
            <Label htmlFor="template-content">Template Content</Label>
            <Input
              id="template-content"
              name="content"
              placeholder="Write your template content here..."
              value={templateData.content}
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>

          <Separator />

          <div>
            <Label htmlFor="template-image">Upload Image</Label>
            <Input
              type="file"
              id="template-image"
              name="image"
              onChange={handleFileUpload}
              className="mt-2"
            />
            {uploadProgress > 0 && (
              <div className="mt-2">
                <Progress value={uploadProgress} />
                <p className="text-sm text-muted-foreground mt-1">{uploadProgress}%</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="secondary">
          <Type className="w-4 h-4 mr-2" />
          Save as Draft
        </Button>
        <Button>
          <Send className="w-4 h-4 mr-2" />
          Send for Approval
        </Button>
      </div>
    </div>
  );
};
