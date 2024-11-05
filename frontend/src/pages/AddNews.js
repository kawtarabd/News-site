import React, { useState } from 'react';
import { format } from 'date-fns'; // Ajoutez cette importation
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddNews = () => {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    date: format(new Date(), 'yyyy-MM-dd') // Utilisez format ici
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.REACT_APP_API_URL}/news`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      toast.success('News added successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error adding news:', error);
      toast.error(error.response?.data?.message || 'Error adding news');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add News
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="title"
            label="Title"
            fullWidth
            margin="normal"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <TextField
            name="url"
            label="URL"
            fullWidth
            margin="normal"
            value={formData.url}
            onChange={handleChange}
            required
          />
          <TextField
            name="date"
            label="Date"
            type="date"
            fullWidth
            margin="normal"
            value={formData.date}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
            sx={{ mt: 2 }}
          >
            Add News
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddNews;