import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import NewsCard from '../components/news/NewsCard';
import newsService from '../services/newsService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

   ```jsx
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await newsService.getAllNews();
        setNews(data.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Latest News
      </Typography>
      <Grid container spacing={3}>
        {news.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <NewsCard news={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;