
import React, { useState } from 'react';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { TemplatePreview } from './TemplatePreview';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';

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
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="templateName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Template Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Template Name" 
                              {...field}
                              className="max-w-full"
                            />
                          </FormControl>
                          <div className="text-xs text-muted-foreground">
                            0/50
                          </div>
                          <div className="text-xs text-muted-foreground">
                            whitespace and uppercase are not allowed
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <select 
                              {...field}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <option value="MARKETING">MARKETING</option>
                              <option value="UTILITY">UTILITY</option>
                              <option value="AUTHENTICATION">AUTHENTICATION</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Language</FormLabel>
                        <FormControl>
                          <select 
                            {...field}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="English (United Kingdom)">English (United Kingdom)</option>
                            <option value="English (United States)">English (United States)</option>
                            <option value="Spanish">Spanish</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

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
                        <div className="text-xs text-muted-foreground">0/60</div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={addVariable}
                      className="text-green-600 border-green-600 hover:bg-green-50"
                    >
                      Add Variable
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={resetVariables}
                      className="text-orange-600 border-orange-600 hover:bg-orange-50"
                    >
                      Reset Variable
                    </Button>
                  </div>
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
                        <div className="text-xs text-muted-foreground">0/1024</div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={addVariable}
                      className="text-green-600 border-green-600 hover:bg-green-50"
                    >
                      Add Variable
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={resetVariables}
                      className="text-orange-600 border-orange-600 hover:bg-orange-50"
                    >
                      Reset Variable
                    </Button>
                  </div>
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
                        <div className="text-xs text-muted-foreground">0/60</div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Buttons Section */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label className="text-base font-medium">Buttons (Optional)</Label>
                  </div>

                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="buttonType"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <input
                              type="radio"
                              {...field}
                              value="callToAction"
                              checked={field.value === 'callToAction'}
                              className="w-4 h-4"
                            />
                          </FormControl>
                          <Label>Call To Action</Label>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="buttonType"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <input
                              type="radio"
                              {...field}
                              value="quickReply"
                              checked={field.value === 'quickReply'}
                              className="w-4 h-4"
                            />
                          </FormControl>
                          <Label>Quick Reply</Label>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>Visit Website</option>
                        <option>Call Now</option>
                        <option>Get Directions</option>
                      </select>
                    </div>

                    <FormField
                      control={form.control}
                      name="buttonText"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input 
                              placeholder="Button text" 
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                updatePreview('buttonText', e.target.value);
                              }}
                            />
                          </FormControl>
                          <div className="text-xs text-muted-foreground">0/20</div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="buttonUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input 
                              placeholder="https://www.example.com" 
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                updatePreview('buttonUrl', e.target.value);
                              }}
                            />
                          </FormControl>
                          <div className="text-xs text-muted-foreground">0/2000</div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    className="text-green-600 border-green-600 hover:bg-green-50"
                  >
                    Add Button
                  </Button>
                </CardContent>
              </Card>

              {/* Variables Section */}
              {variables.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Variables</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {variables.map((variable) => (
                      <div key={variable.id} className="flex gap-2 items-center">
                        <Input
                          placeholder="Variable name"
                          value={variable.name}
                          onChange={(e) => updateVariable(variable.id, 'name', e.target.value)}
                          className="flex-1"
                        />
                        <Input
                          placeholder="Default value"
                          value={variable.value}
                          onChange={(e) => updateVariable(variable.id, 'value', e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeVariable(variable.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

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
