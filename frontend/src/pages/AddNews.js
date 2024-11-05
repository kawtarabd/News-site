import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import newsService from '../services/newsService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddNews = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await newsService.addNews({ title, url });
      toast.success('News added successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add news');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add News
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="URL"
          variant="outlined"
          fullWidth
          margin="normal"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Add News
        </Button>
      </form>
    </Container>
  );
};

export default AddNews;