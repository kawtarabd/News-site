import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import axios from 'axios';
import NewsCard from '../components/news/NewsCard';

import { toast } from 'react-toastify';

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/news`);
        // Trier les news par date (du plus récent au plus ancien)
        const sortedNews = response.data.sort((a, b) => 
          new Date(b.date) - new Date(a.date)
        );
        setNews(sortedNews); // Utilisez sortedNews ici
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        toast.error('Error loading news');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
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
      </Box>
    </Container>
  );
};

export default Home;