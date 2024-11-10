// src/pages/AddNews.js
import React, { useState } from 'react';
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Alert, 
  CircularProgress 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import newsService from '../services/newsService';

// Validation d'URL améliorée sans échappements inutiles
const urlPattern = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_~#?&//=]*)$/;

const AddNews = () => {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    content: ''
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Validation des données
      if (!formData.title.trim() || !formData.url.trim()) {
        setError('Tous les champs sont obligatoires');
        return;
      }

      // Validation d'URL
      if (!urlPattern.test(formData.url)) {
        setError('URL invalide');
        return;
      }

      // Appeler le service de création de news
      await newsService.addNews({
        title: formData.title.trim(),
        url: formData.url.trim(),
        content: formData.content.trim()
      });

      // Notification de succès
      toast.success('Actualité ajoutée avec succès !');

      // Redirection
      navigate('/news');
    } catch (err) {
      // Gestion des erreurs
      const errorMessage = 
        err.response?.data?.message || 
        err.message || 
        'Une erreur est survenue lors de l\'ajout de l\'actualité';
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box 
        sx={{ 
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Ajouter une actualité
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          {error && (
            <Alert 
              severity="error" 
              onClose={() => setError(null)}
              sx={{ mb: 2 }}
            >
              {error}
            </Alert>
          )}

          <TextField
            margin="normal"
            required
            fullWidth
            label="Titre"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={!!error && !formData.title.trim()}
            helperText={error && !formData.title.trim() ? 'Le titre est requis' : ''}
            disabled={isLoading}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="URL"
            name="url"
            value={formData.url}
            onChange={handleChange}
            error={!!error && !urlPattern.test(formData.url)}
            helperText={error && !urlPattern.test(formData.url) ? 'URL invalide' : ''}
            disabled={isLoading}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Contenu (optionnel)"
            name="content"
            multiline
            rows={4}
            value={formData.content}
            onChange={handleChange}
            disabled={isLoading}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Ajouter l\'actualité'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddNews;