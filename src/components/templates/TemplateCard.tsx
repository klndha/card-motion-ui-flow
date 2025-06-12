
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Trash2, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TemplateCardProps {
  template: {
    id: string;
    name: string;
    category: string;
    status: 'APPROVED' | 'PENDING' | 'DRAFT';
    language: string;
  };
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TemplateCard({ template, onView, onDelete }: TemplateCardProps) {
  const { toast } = useToast();

  const statusColors = {
    APPROVED: 'bg-green-100 text-green-700 hover:bg-green-200',
    PENDING: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
    DRAFT: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
  };

  const handleView = () => {
    onView(template.id);
    toast({
      title: "Template Viewed",
      description: `Viewing template: ${template.name}`,
    });
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${template.name}"?`)) {
      onDelete(template.id);
      toast({
        title: "Template Deleted",
        description: `Template "${template.name}" has been deleted.`,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="group card-hover cursor-pointer border-2 hover:border-primary/20 transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
                {template.name}
              </h3>
              <p className="text-sm text-muted-foreground">{template.category}</p>
            </div>
          </div>
          <Badge 
            variant="secondary" 
            className={statusColors[template.status]}
          >
            {template.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Language: <span className="font-medium text-foreground">{template.language}</span>
          </div>
          
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleView}
              className="h-8 w-8 p-0 hover:bg-blue-50 hover:border-blue-300"
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleDelete}
              className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
