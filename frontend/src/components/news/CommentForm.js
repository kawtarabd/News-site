import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import newsService from '../../services/newsService';

const CommentForm = ({ newsId, onCommentAdded }) => {
  const { user } = useAuth();  // Récupère l'utilisateur connecté
  const [comment, setComment] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (comment.trim() === '') {
      return; // Ne rien faire si le commentaire est vide
    }

    try {
      // Créer un objet commentData avec le texte du commentaire et le nom de l'utilisateur
      const commentData = {
        text: comment,
        author: user.name,  // Assure-toi que user.name est bien défini dans le contexte
        date: new Date(),
      };

      // Envoie du commentaire au backend
      await newsService.addComment(newsId, commentData);
      onCommentAdded(newsId); // Rafraîchit les commentaires après ajout
      setComment(''); // Réinitialise le champ de texte
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire :', error);
    }
  };

  return (
    <Box>
      <TextField
        label="Ajouter un commentaire"
        fullWidth
        variant="outlined"
        value={comment}
        onChange={handleCommentChange}
        sx={{ mb: 2 }}
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSubmit} 
        disabled={!comment.trim()}
      >
        Commenter
      </Button>
    </Box>
  );
};

export default CommentForm;
