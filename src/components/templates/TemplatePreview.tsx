
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Box,
  Paper,
  Avatar
} from '@mui/material';
import { Phone, Link as LinkIcon } from '@mui/icons-material';

interface TemplatePreviewProps {
  data: any;
}

export function TemplatePreview({ data }: TemplatePreviewProps) {
  return (
    <Card sx={{ bgcolor: 'success.light', height: '100%' }}>
      <CardHeader 
        sx={{ bgcolor: 'success.main', color: 'white' }}
        title={
          <Typography variant="h6" color="inherit">
            Live Preview
          </Typography>
        }
      />
      <CardContent sx={{ p: 0, height: 'calc(100% - 64px)', overflow: 'auto' }}>
        <Box sx={{ bgcolor: 'success.main', p: 3 }}>
          <Paper 
            elevation={3}
            sx={{ 
              maxWidth: 320, 
              mx: 'auto',
              borderRadius: 3,
              overflow: 'hidden'
            }}
          >
            {/* Phone Header */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              p: 2, 
              borderBottom: 1, 
              borderColor: 'grey.200',
              bgcolor: 'grey.50'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar sx={{ width: 24, height: 24, bgcolor: 'grey.300' }} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  WhatsApp Business
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Typography>
            </Box>

            {/* Message Content */}
            <Box sx={{ p: 2, minHeight: 200 }}>
              {data.headerText && (
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                  {data.headerText}
                </Typography>
              )}

              {data.bodyText && (
                <Typography variant="body2" sx={{ color: 'text.primary', mb: 2, lineHeight: 1.5 }}>
                  {data.bodyText}
                </Typography>
              )}

              {data.footerText && (
                <Typography variant="caption" sx={{ color: 'text.secondary', fontStyle: 'italic', display: 'block', mb: 2 }}>
                  {data.footerText}
                </Typography>
              )}

              {/* Media Files Preview */}
              {data.mediaFiles && data.mediaFiles.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  {data.mediaFiles.map((file: any) => (
                    <Paper key={file.id} sx={{ p: 1, mb: 1, bgcolor: 'grey.100' }}>
                      <Typography variant="caption">
                        📎 {file.name}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              )}

              {/* Communication Actions */}
              {data.communicationType === 'call_to_action' && (
                <Box sx={{ mt: 2, space: 1 }}>
                  {data.buttonText && data.buttonUrl && (
                    <Button 
                      variant="outlined" 
                      size="small" 
                      fullWidth
                      startIcon={<LinkIcon />}
                      sx={{ mb: 1, color: 'primary.main', borderColor: 'primary.main' }}
                    >
                      {data.buttonText}
                    </Button>
                  )}
                  {data.phoneNumber && (
                    <Button 
                      variant="outlined" 
                      size="small" 
                      fullWidth
                      startIcon={<Phone />}
                      sx={{ color: 'success.main', borderColor: 'success.main' }}
                    >
                      Call {data.phoneNumber}
                    </Button>
                  )}
                </Box>
              )}

              {data.communicationType === 'quick_reply' && (
                <Box sx={{ mt: 2 }}>
                  <Button 
                    variant="contained" 
                    size="small" 
                    fullWidth
                    sx={{ bgcolor: 'primary.main' }}
                  >
                    Quick Reply
                  </Button>
                </Box>
              )}
            </Box>

            {/* Decorative Pattern */}
            <Box sx={{ 
              height: 80, 
              bgcolor: 'success.main',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <Box sx={{ 
                position: 'absolute',
                inset: 0,
                opacity: 0.3,
                background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
              }} />
            </Box>
          </Paper>
        </Box>
      </CardContent>
    </Card>
  );
}
