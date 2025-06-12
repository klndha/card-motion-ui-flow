import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import { Badge } from '@/components/Badge';
import { Plus, Minus, Copy, Trash2 } from 'lucide-react';

interface Variable {
  id: string;
  name: string;
  defaultValue: string;
}

export function VariableManager() {
  const [variables, setVariables] = useState<Variable[]>([
    { id: '1', name: 'ClientName', defaultValue: 'John Doe' },
    { id: '2', name: 'AppointmentDate', defaultValue: 'Tomorrow' },
  ]);

  const handleAddVariable = () => {
    const newVariable: Variable = {
      id: String(Date.now()),
      name: 'NewVariable',
      defaultValue: '',
    };
    setVariables([...variables, newVariable]);
  };

  const handleRemoveVariable = (id: string) => {
    setVariables(variables.filter((variable) => variable.id !== id));
  };

  const handleDuplicateVariable = (variable: Variable) => {
    const newVariable: Variable = {
      id: String(Date.now()),
      name: `${variable.name}Copy`,
      defaultValue: variable.defaultValue,
    };
    setVariables([...variables, newVariable]);
  };

  const handleUpdateVariable = (id: string, field: keyof Variable, value: string) => {
    setVariables(
      variables.map((variable) =>
        variable.id === id ? { ...variable, [field]: value } : variable
      )
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Variable Manager</CardTitle>
          <Button size="sm" onClick={handleAddVariable}>
            <Plus className="w-4 h-4 mr-2" />
            Add Variable
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {variables.map((variable) => (
            <div key={variable.id} className="grid grid-cols-4 gap-4 items-center">
              <Label htmlFor={`name-${variable.id}`} className="text-right">
                Name
              </Label>
              <Input
                id={`name-${variable.id}`}
                value={variable.name}
                onChange={(e) => handleUpdateVariable(variable.id, 'name', e.target.value)}
                className="col-span-3"
              />

              <Label htmlFor={`defaultValue-${variable.id}`} className="text-right">
                Default Value
              </Label>
              <Input
                id={`defaultValue-${variable.id}`}
                value={variable.defaultValue}
                onChange={(e) => handleUpdateVariable(variable.id, 'defaultValue', e.target.value)}
                className="col-span-3"
              />

              <div className="col-span-1"></div>
              <div className="col-span-3 flex justify-end gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => handleDuplicateVariable(variable)}
                  className="h-8 w-8"
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => handleRemoveVariable(variable.id)}
                  className="h-8 w-8"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
