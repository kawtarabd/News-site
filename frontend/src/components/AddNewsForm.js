// src/components/AddNewsForm.js
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box
} from '@mui/material';

const AddNewsForm = ({ open, handleClose, handleSubmit }) => {
  const [newsData, setNewsData] = useState({
    title: '',
    url: '',
    content: ''
  });

  const handleChange = (e) => {
    setNewsData({
      ...newsData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(newsData);
    setNewsData({ title: '', url: '', content: '' });
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Add New News</DialogTitle>
      <Box component="form" onSubmit={onSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            required
            value={newsData.title}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="url"
            label="URL"
            type="url"
            fullWidth
            required
            value={newsData.url}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="content"
            label="Content"
            multiline
            rows={4}
            fullWidth
            required
            value={newsData.content}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Add News
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AddNewsForm;