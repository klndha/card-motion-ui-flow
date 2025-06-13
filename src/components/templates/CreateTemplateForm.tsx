
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Paper,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert
} from '@mui/material';
import {
  Save,
  Preview,
  Send,
  Add,
  Delete,
  Phone,
  Link as LinkIcon,
  Image as ImageIcon,
  VideoFile,
  Description
} from '@mui/icons-material';
import { TemplatePreview } from './TemplatePreview';

const mediaTypes = [
  { type: 'image', icon: ImageIcon, label: 'Image', accept: 'image/*' },
  { type: 'video', icon: VideoFile, label: 'Video', accept: 'video/*' },
  { type: 'document', icon: Description, label: 'Document', accept: '.pdf,.doc,.docx' }
];

const communicationOptions = [
  { id: 'quick_reply', label: 'Quick Reply', unlimited: true },
  { id: 'call_to_action', label: 'Call to Action', hasLink: true, hasPhone: true }
];

export function CreateTemplateForm() {
  const [templateData, setTemplateData] = useState({
    name: '',
    category: 'MARKETING',
    language: 'English',
    headerText: '',
    bodyText: '',
    footerText: '',
    buttonText: '',
    buttonUrl: '',
    phoneNumber: '',
    mediaFiles: [],
    variables: [],
    communicationType: 'quick_reply',
    status: 'DRAFT'
  });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const handleInputChange = (field: string) => (event: any) => {
    setTemplateData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleFileUpload = (mediaType: string) => (event: any) => {
    const files = Array.from(event.target.files);
    files.forEach((file: any) => {
      const fileId = Date.now() + Math.random();
      const newFile = {
        id: fileId,
        name: file.name,
        type: mediaType,
        size: file.size,
        file: file
      };

      setTemplateData(prev => ({
        ...prev,
        mediaFiles: [...prev.mediaFiles, newFile] as any
      }));

      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(prev => ({ ...prev, [fileId]: progress }));
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploadProgress(prev => {
              const newProgress = { ...prev };
              delete (newProgress as any)[fileId];
              return newProgress;
            });
          }, 1000);
        }
      }, 100);
    });
  };

  const removeMediaFile = (fileId: number) => {
    setTemplateData(prev => ({
      ...prev,
      mediaFiles: prev.mediaFiles.filter((file: any) => file.id !== fileId)
    }));
  };

  const addVariable = () => {
    const newVariable = {
      id: Date.now(),
      name: `variable_${templateData.variables.length + 1}`,
      defaultValue: ''
    };
    setTemplateData(prev => ({
      ...prev,
      variables: [...prev.variables, newVariable] as any
    }));
  };

  const updateVariable = (id: number, field: string, value: string) => {
    setTemplateData(prev => ({
      ...prev,
      variables: prev.variables.map((variable: any) =>
        variable.id === id ? { ...variable, [field]: value } : variable
      )
    }));
  };

  const removeVariable = (id: number) => {
    setTemplateData(prev => ({
      ...prev,
      variables: prev.variables.filter((variable: any) => variable.id !== id)
    }));
  };

  const handleSave = () => {
    console.log('Saving template:', templateData);
    alert('Template saved successfully!');
  };

  const handlePreview = () => {
    setPreviewOpen(true);
  };

  const handleSendForApproval = () => {
    console.log('Sending for approval:', templateData);
    alert('Template sent for approval!');
  };

  return (
    <Box sx={{ height: '100vh', overflow: 'hidden' }}>
      <Grid container sx={{ height: '100%' }}>
        {/* Scrollable Creation Panel */}
        <Grid item xs={12} md={8}>
          <Box sx={{ height: '100%', overflow: 'auto', p: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                Create New Template
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Design your marketing template with media and interactive elements
              </Typography>
            </Box>

            {/* Basic Information */}
            <Card sx={{ mb: 3 }}>
              <CardHeader 
                title="Basic Information"
                action={
                  <Chip 
                    label={templateData.status} 
                    color={templateData.status === 'APPROVED' ? 'success' : 'default'}
                    size="small"
                  />
                }
              />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Template Name"
                      value={templateData.name}
                      onChange={handleInputChange('name')}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Category</InputLabel>
                      <Select
                        value={templateData.category}
                        onChange={handleInputChange('category')}
                        label="Category"
                      >
                        <MenuItem value="MARKETING">Marketing</MenuItem>
                        <MenuItem value="ADMIN">Administrative</MenuItem>
                        <MenuItem value="NOTIFICATION">Notification</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Language</InputLabel>
                      <Select
                        value={templateData.language}
                        onChange={handleInputChange('language')}
                        label="Language"
                      >
                        <MenuItem value="English">English</MenuItem>
                        <MenuItem value="Spanish">Spanish</MenuItem>
                        <MenuItem value="French">French</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={templateData.status}
                        onChange={handleInputChange('status')}
                        label="Status"
                      >
                        <MenuItem value="DRAFT">Draft</MenuItem>
                        <MenuItem value="PENDING">Pending</MenuItem>
                        <MenuItem value="APPROVED">Approved</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Media Upload */}
            <Card sx={{ mb: 3 }}>
              <CardHeader title="Media Files" />
              <CardContent>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  {mediaTypes.map((media) => (
                    <Grid item xs={12} sm={4} key={media.type}>
                      <Button
                        component="label"
                        variant="outlined"
                        fullWidth
                        startIcon={<media.icon />}
                        sx={{ py: 2 }}
                      >
                        Upload {media.label}
                        <input
                          type="file"
                          hidden
                          accept={media.accept}
                          multiple
                          onChange={handleFileUpload(media.type)}
                        />
                      </Button>
                    </Grid>
                  ))}
                </Grid>

                {templateData.mediaFiles.length > 0 && (
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Uploaded Files:
                    </Typography>
                    {templateData.mediaFiles.map((file: any) => (
                      <Paper key={file.id} sx={{ p: 2, mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {mediaTypes.find(m => m.type === file.type)?.icon && 
                            React.createElement(mediaTypes.find(m => m.type === file.type)!.icon, { fontSize: 'small' })
                          }
                          <Typography variant="body2">{file.name}</Typography>
                          <Chip label={file.type} size="small" />
                        </Box>
                        <IconButton 
                          size="small" 
                          onClick={() => removeMediaFile(file.id)}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </Paper>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>

            {/* Content */}
            <Card sx={{ mb: 3 }}>
              <CardHeader title="Template Content" />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Header Text"
                      value={templateData.headerText}
                      onChange={handleInputChange('headerText')}
                      placeholder="Enter header text..."
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Body Text"
                      value={templateData.bodyText}
                      onChange={handleInputChange('bodyText')}
                      placeholder="Enter your main message..."
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Footer Text"
                      value={templateData.footerText}
                      onChange={handleInputChange('footerText')}
                      placeholder="Enter footer text..."
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Communication Options */}
            <Card sx={{ mb: 3 }}>
              <CardHeader title="Communication Options" />
              <CardContent>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Communication Type</InputLabel>
                  <Select
                    value={templateData.communicationType}
                    onChange={handleInputChange('communicationType')}
                    label="Communication Type"
                  >
                    {communicationOptions.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.label}
                        {option.unlimited && <Chip label="Unlimited" size="small" sx={{ ml: 1 }} />}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {templateData.communicationType === 'call_to_action' && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Button Text"
                        value={templateData.buttonText}
                        onChange={handleInputChange('buttonText')}
                        placeholder="Call Now"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Website URL"
                        value={templateData.buttonUrl}
                        onChange={handleInputChange('buttonUrl')}
                        placeholder="https://example.com"
                        InputProps={{
                          startAdornment: <LinkIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        value={templateData.phoneNumber}
                        onChange={handleInputChange('phoneNumber')}
                        placeholder="+1 (555) 123-4567"
                        InputProps={{
                          startAdornment: <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                        }}
                      />
                    </Grid>
                  </Grid>
                )}
              </CardContent>
            </Card>

            {/* Variables */}
            <Card sx={{ mb: 3 }}>
              <CardHeader 
                title="Variables" 
                action={
                  <Button startIcon={<Add />} onClick={addVariable}>
                    Add Variable
                  </Button>
                }
              />
              <CardContent>
                {templateData.variables.length === 0 ? (
                  <Alert severity="info">
                    No variables added yet. Variables allow you to personalize your templates.
                  </Alert>
                ) : (
                  <Box>
                    {templateData.variables.map((variable: any) => (
                      <Paper key={variable.id} sx={{ p: 2, mb: 2 }}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={12} md={4}>
                            <TextField
                              fullWidth
                              size="small"
                              label="Variable Name"
                              value={variable.name}
                              onChange={(e) => updateVariable(variable.id, 'name', e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              fullWidth
                              size="small"
                              label="Default Value"
                              value={variable.defaultValue}
                              onChange={(e) => updateVariable(variable.id, 'defaultValue', e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={12} md={2}>
                            <IconButton 
                              color="error" 
                              onClick={() => removeVariable(variable.id)}
                            >
                              <Delete />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Paper>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', pb: 3 }}>
              <Button variant="outlined" startIcon={<Save />} onClick={handleSave}>
                Save Draft
              </Button>
              <Button variant="outlined" startIcon={<Preview />} onClick={handlePreview}>
                Preview
              </Button>
              <Button variant="contained" startIcon={<Send />} onClick={handleSendForApproval}>
                Send for Approval
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* Static Preview Panel */}
        <Grid item xs={12} md={4}>
          <Box sx={{ height: '100%', borderLeft: 1, borderColor: 'divider', bgcolor: 'grey.50' }}>
            <TemplatePreview data={templateData} />
          </Box>
        </Grid>
      </Grid>

      {/* Preview Dialog */}
      <Dialog 
        open={previewOpen} 
        onClose={() => setPreviewOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Template Preview</DialogTitle>
        <DialogContent>
          <TemplatePreview data={templateData} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
