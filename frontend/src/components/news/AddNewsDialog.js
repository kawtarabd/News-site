// components/news/AddNewsDialog.js
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Chip,
  IconButton
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const AddNewsDialog = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    url: '',
    tags: []
  });
  const [newTag, setNewTag] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && newTag.trim()) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({ title: '', content: '', url: '', tags: [] });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Add New Article
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            name="title"
            label="Title"
            fullWidth
            required
            value={formData.title}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            name="url"
            label="URL"
            fullWidth
            required
            value={formData.url}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            name="content"
            label="Content"
            fullWidth
            multiline
            rows={4}
            value={formData.content}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Add Tags"
            fullWidth
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={handleAddTag}
            margin="normal"
            helperText="Press Enter to add a tag"
          />
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {formData.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => handleRemoveTag(tag)}
              />
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          disabled={!formData.title || !formData.url}
        >
          Add News
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewsDialog;