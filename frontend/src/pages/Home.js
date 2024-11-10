// pages/Home.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import NewsCard from '../components/news/NewsCard';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '60vh',
}));

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/news');
        if (response.data && response.data.success && Array.isArray(response.data.data)) {
          const sortedNews = response.data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
          setNews(sortedNews);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <StyledContainer>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 600,
          color: 'primary.main',
        }}
      >
        Latest News
      </Typography>

      {loading ? (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      ) : news.length > 0 ? (
        <Grid container spacing={3}>
          {news.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <NewsCard news={item} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            mt: 4,
          }}
        >
          No news available
        </Typography>
      )}
    </StyledContainer>
  );
};

export default Home;