
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Plus } from 'lucide-react';

interface Variable {
  id: string;
  name: string;
  value: string;
}

interface VariableManagerProps {
  variables: Variable[];
  onAddVariable: () => void;
  onRemoveVariable: (id: string) => void;
  onUpdateVariable: (id: string, field: 'name' | 'value', value: string) => void;
  onResetVariables: () => void;
}

export function VariableManager({ 
  variables, 
  onAddVariable, 
  onRemoveVariable, 
  onUpdateVariable, 
  onResetVariables 
}: VariableManagerProps) {
  return (
    <>
      <div className="flex gap-2">
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={onAddVariable}
          className="text-green-600 border-green-600 hover:bg-green-50"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Variable
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={onResetVariables}
          className="text-orange-600 border-orange-600 hover:bg-orange-50"
        >
          Reset Variables
        </Button>
      </div>

      {variables.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Variables</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {variables.map((variable) => (
              <div key={variable.id} className="flex gap-2 items-center">
                <Input
                  placeholder="Variable name"
                  value={variable.name}
                  onChange={(e) => onUpdateVariable(variable.id, 'name', e.target.value)}
                  className="flex-1"
                />
                <Input
                  placeholder="Default value"
                  value={variable.value}
                  onChange={(e) => onUpdateVariable(variable.id, 'value', e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onRemoveVariable(variable.id)}
                  className="h-10 w-10 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
}
