
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TemplatePreviewProps {
  data: {
    headerText: string;
    bodyText: string;
    footerText: string;
    buttonText: string;
    buttonUrl: string;
  };
}

export function TemplatePreview({ data }: TemplatePreviewProps) {
  return (
    <Card className="bg-green-100">
      <CardHeader className="bg-green-600 text-white">
        <CardTitle className="text-lg">Preview</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Phone Mockup */}
        <div className="bg-green-600 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-sm mx-auto">
            {/* Phone Header */}
            <div className="flex justify-between items-center p-3 border-b">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <span className="text-sm font-medium">WhatsApp Business</span>
              </div>
              <span className="text-xs text-gray-500">10:58 AM</span>
            </div>

            {/* Message Content */}
            <div className="p-4 space-y-3">
              {/* Header Text */}
              {data.headerText && (
                <div className="font-medium text-sm">
                  {data.headerText}
                </div>
              )}

              {/* Body Text */}
              {data.bodyText && (
                <div className="text-sm text-gray-700 leading-relaxed">
                  {data.bodyText}
                </div>
              )}

              {/* Footer Text */}
              {data.footerText && (
                <div className="text-xs text-gray-500 italic">
                  {data.footerText}
                </div>
              )}

              {/* Action Button */}
              {data.buttonText && (
                <div className="pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-blue-600 border-blue-600 hover:bg-blue-50"
                  >
                    {data.buttonText}
                  </Button>
                </div>
              )}
            </div>

            {/* Decorative Pattern */}
            <div className="h-32 bg-green-600 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <defs>
                    <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="10" cy="10" r="2" fill="white" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#pattern)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
