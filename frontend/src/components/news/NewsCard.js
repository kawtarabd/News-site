import { useState } from 'react';
import { Card, CardContent, CardActions, Typography, Button, Box, Tooltip, styled, Divider } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LinkIcon from '@mui/icons-material/Link';
import CommentForm from './CommentForm'; // Comment Form Component
import CommentList from './CommentList'; // Comment List Component

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  overflow: 'hidden',
}));

const NewsCard = ({
  news,
  onEdit,
  onDelete,
  onLike,
  onDislike,
  currentUser,
  isLoading
}) => {
  const [comments, setComments] = useState(news.comments || []);

  // Callback to handle comment addition
  const handleCommentAdded = () => {
    // Simulate comment addition (in production, you might fetch updated comments here)
    setComments([...comments, { text: 'New Comment', user: { firstName: 'Utilisateur' }, createdAt: new Date() }]);
  };

  return (
    <StyledCard elevation={2}>
      <StyledCardContent>
        <Typography variant="h6" gutterBottom noWrap>
          {news.title || 'Titre non disponible'}
        </Typography>

        {/* Afficher le contenu de l'actualité */}
        <Typography variant="body1" paragraph>
          {news.content || 'Contenu non disponible'}
        </Typography>

        {news.url && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <LinkIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 'small' }} />
            <Typography
              variant="body2"
              color="text.secondary"
              component="a"
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              {news.url}
            </Typography>
          </Box>
        )}

        <Typography variant="caption" color="text.secondary">
          Publié le {new Date(news.date).toLocaleDateString('fr-FR')}
        </Typography>
      </StyledCardContent>

      <CardActions sx={{ justifyContent: 'space-between', px: 2, py: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Like">
            <Button onClick={onLike} disabled={isLoading}>
              <ThumbUpIcon fontSize="small" />
            </Button>
          </Tooltip>
          <Typography variant="caption">{news.likes?.length || 0}</Typography>

          <Tooltip title="Dislike">
            <Button onClick={onDislike} disabled={isLoading}>
              <ThumbDownIcon fontSize="small" />
            </Button>
          </Tooltip>
          <Typography variant="caption">{news.dislikes?.length || 0}</Typography>
        </Box>

        {currentUser && currentUser._id === news.user && (
          <Box>
            <Button onClick={() => onEdit(news._id)} disabled={isLoading} startIcon={<EditIcon />}>
              Modifier
            </Button>
            <Button onClick={() => onDelete(news._id)} disabled={isLoading} startIcon={<DeleteIcon />} color="error">
              Supprimer
            </Button>
          </Box>
        )}
      </CardActions>

      <Divider />

      {/* Single Comment Section */}
      <Box sx={{ p: 2 }}>
        <CommentForm newsId={news._id} onCommentAdded={handleCommentAdded} />
        <CommentList comments={comments} />
      </Box>
    </StyledCard>
  );
};

export default NewsCard;
