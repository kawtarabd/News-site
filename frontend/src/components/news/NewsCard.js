import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import newsService from '../../services/newsService';

const NewsCard = ({ news }) => {
  const handleLike = async () => {
    await newsService.likeNews(news._id);
    // Optionally, refresh the news state or update the UI accordingly
  };

  const handleDislike = async () => {
    await newsService.dislikeNews(news._id);
    // Optionally, refresh the news state or update the UI accordingly
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{news.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {news.url}
        </Typography>
        <Typography variant="body2">
          Likes: {news.likes.length} | Dislikes: {news.dislikes.length}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleLike}>Like</Button>
        <Button size="small" onClick={handleDislike}>Dislike</Button>
      </CardActions>
    </Card>
  );
};

export default NewsCard;