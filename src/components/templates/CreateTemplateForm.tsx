
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { TemplatePreview } from './TemplatePreview';
import { BasicInfoSection } from './forms/BasicInfoSection';
import { VariableManager } from './forms/VariableManager';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface Variable {
  id: string;
  name: string;
  value: string;
}

interface FormData {
  templateName: string;
  category: string;
  language: string;
  headerType: 'text' | 'media';
  headerText: string;
  bodyText: string;
  footerText: string;
  buttonType: 'callToAction' | 'quickReply';
  buttonText: string;
  buttonUrl: string;
}

export function CreateTemplateForm() {
  const navigate = useNavigate();
  const [variables, setVariables] = useState<Variable[]>([]);
  const [previewData, setPreviewData] = useState({
    headerText: '',
    bodyText: '',
    footerText: '',
    buttonText: '',
    buttonUrl: '',
  });

  const form = useForm<FormData>({
    defaultValues: {
      templateName: '',
      category: 'MARKETING',
      language: 'English (United Kingdom)',
      headerType: 'text',
      headerText: '',
      bodyText: '',
      footerText: '',
      buttonType: 'callToAction',
      buttonText: '',
      buttonUrl: 'https://www.example.com',
    },
  });

  const handleBack = () => {
    navigate('/');
  };

  const addVariable = () => {
    const newVariable: Variable = {
      id: Math.random().toString(36).substr(2, 9),
      name: `variable_${variables.length + 1}`,
      value: '',
    };
    setVariables([...variables, newVariable]);
  };

  const removeVariable = (id: string) => {
    setVariables(variables.filter(v => v.id !== id));
  };

  const updateVariable = (id: string, field: 'name' | 'value', value: string) => {
    setVariables(variables.map(v => 
      v.id === id ? { ...v, [field]: value } : v
    ));
  };

  const resetVariables = () => {
    setVariables([]);
  };

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    console.log('Variables:', variables);
    // Handle form submission
  };

  const updatePreview = (field: string, value: string) => {
    setPreviewData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Create Template
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information */}
              <BasicInfoSection form={form} />

              {/* Header Section */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label className="text-base font-medium">Header (Optional)</Label>
                  </div>

                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="headerType"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <input
                              type="radio"
                              {...field}
                              value="text"
                              checked={field.value === 'text'}
                              className="w-4 h-4"
                            />
                          </FormControl>
                          <Label>Text</Label>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="headerType"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <input
                              type="radio"
                              {...field}
                              value="media"
                              checked={field.value === 'media'}
                              className="w-4 h-4"
                            />
                          </FormControl>
                          <Label>Media</Label>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="headerText"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            placeholder="Enter text" 
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              updatePreview('headerText', e.target.value);
                            }}
                          />
                        </FormControl>
                        <div className="text-xs text-muted-foreground">{field.value?.length || 0}/60</div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <VariableManager
                    variables={variables}
                    onAddVariable={addVariable}
                    onRemoveVariable={removeVariable}
                    onUpdateVariable={updateVariable}
                    onResetVariables={resetVariables}
                  />
                </CardContent>
              </Card>

              {/* Body Section */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label className="text-base font-medium">Body</Label>
                  </div>

                  <FormField
                    control={form.control}
                    name="bodyText"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea 
                            placeholder="Type here..." 
                            {...field}
                            className="min-h-[200px] resize-none"
                            onChange={(e) => {
                              field.onChange(e);
                              updatePreview('bodyText', e.target.value);
                            }}
                          />
                        </FormControl>
                        <div className="text-xs text-muted-foreground">{field.value?.length || 0}/1024</div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Footer Section */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label className="text-base font-medium">Footer (Optional)</Label>
                  </div>

                  <FormField
                    control={form.control}
                    name="footerText"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            placeholder="Enter text" 
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              updatePreview('footerText', e.target.value);
                            }}
                          />
                        </FormControl>
                        <div className="text-xs text-muted-foreground">{field.value?.length || 0}/60</div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button 
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6"
                >
                  Save and submit
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* Preview Section */}
        <div className="lg:sticky lg:top-6">
          <TemplatePreview data={previewData} />
        </div>
      </div>
    </div>
  );
}
