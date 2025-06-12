
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Trash2 } from 'lucide-react';

interface TemplateCardProps {
  template: {
    id: string;
    name: string;
    category: string;
    status: 'APPROVED' | 'PENDING' | 'DRAFT';
    language: string;
  };
  onView: () => void;
  onDelete: () => void;
}

export function TemplateCard({ template, onView, onDelete }: TemplateCardProps) {
  const statusColors = {
    APPROVED: 'bg-success/10 text-success hover:bg-success/20',
    PENDING: 'bg-warning/10 text-warning hover:bg-warning/20',
    DRAFT: 'bg-muted text-muted-foreground hover:bg-muted/80'
  };

  return (
    <Card className="group card-hover cursor-pointer border-2 hover:border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <div className="w-5 h-5 bg-primary rounded-sm" />
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
              onClick={onView}
              className="h-8 w-8 p-0"
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={onDelete}
              className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
