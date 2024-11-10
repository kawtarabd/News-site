import React, { useState, useEffect, useCallback } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Grid, 
  CircularProgress, 
  Alert,
  Pagination,
  Box
} from '@mui/material';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import newsService from '../services/newsService';
import NewsCard from '../components/news/NewsCard';
import AddNewsDialog from '../components/news/AddNewsDialog';

const ITEMS_PER_PAGE = 6; // Nombre d'articles par page

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});
  const [error, setError] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [page, setPage] = useState(1);
  const { user } = useAuth();

  const fetchNews = useCallback(async (newsId) => {
    try {
      setLoading(true);
      const response = await newsService.getAllNews();
      console.log('Réponse du serveur:', response); // Pour déboguer
      if (response.success && Array.isArray(response.data)) {
        setNews((prevNews) => {
          if (newsId) {
            // Update only the targeted news item's comments
            return prevNews.map(item => item._id === newsId ? response.data.find(newItem => newItem._id === newsId) : item);
          }
          return response.data;
        });
      } else {
        throw new Error('Format de données invalide');
      }
    } catch (error) {
      console.error('Erreur détaillée:', error);
      setError(`Erreur lors du chargement des actualités : ${error.message}`);
      setNews([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleAddNews = async (newsData) => {
    try {
      setActionLoading(prev => ({ ...prev, add: true }));
      await newsService.addNews(newsData);
      await fetchNews();
      setOpenAddDialog(false);
      toast.success('Actualité ajoutée avec succès');
    } catch (error) {
      toast.error(`Erreur lors de l'ajout : ${error.message}`);
    } finally {
      setActionLoading(prev => ({ ...prev, add: false }));
    }
  };

  const handleEditNews = async (id, newsData) => {
    try {
      setActionLoading(prev => ({ ...prev, [id]: true }));
      await newsService.updateNews(id, newsData);
      await fetchNews();
      toast.success('Actualité modifiée avec succès');
    } catch (error) {
      toast.error(`Erreur lors de la modification : ${error.message}`);
    } finally {
      setActionLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleDeleteNews = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette actualité ?')) {
      try {
        setActionLoading(prev => ({ ...prev, [id]: true }));
        await newsService.deleteNews(id);
        await fetchNews();
        toast.success('Actualité supprimée avec succès');
      } catch (error) {
        toast.error(`Erreur lors de la suppression : ${error.message}`);
      } finally {
        setActionLoading(prev => ({ ...prev, [id]: false }));
      }
    }
  };

  const handleLike = useCallback(async (newsId) => {
    try {
      setActionLoading(prev => ({ ...prev, [`like-${newsId}`]: true }));
      await newsService.likeNews(newsId);
      await fetchNews();
    } catch (error) {
      toast.error(`Erreur lors du like : ${error.message}`);
    } finally {
      setActionLoading(prev => ({ ...prev, [`like-${newsId}`]: false }));
    }
  }, [fetchNews]);

  const handleDislike = useCallback(async (newsId) => {
    try {
      setActionLoading(prev => ({ ...prev, [`dislike-${newsId}`]: true }));
      await newsService.dislikeNews(newsId);
      await fetchNews();
    } catch (error) {
      toast.error(`Erreur lors du dislike : ${error.message}`);
    } finally {
      setActionLoading(prev => ({ ...prev, [`dislike-${newsId}`]: false }));
    }
  }, [fetchNews]);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const indexOfLastItem = page * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentNews = news.slice(indexOfFirstItem, indexOfLastItem);
  const pageCount = Math.ceil(news.length / ITEMS_PER_PAGE);

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          News
        </Typography>

        {user && (
          <Button 
            variant="contained" 
            onClick={() => setOpenAddDialog(true)}
            sx={{ mb: 3 }}
            disabled={actionLoading.add}
          >
            {actionLoading.add ? 'Ajout en cours...' : 'Ajouter News'}
          </Button>
        )}

        <AddNewsDialog
          open={openAddDialog}
          onClose={() => setOpenAddDialog(false)}
          onSubmit={handleAddNews}
        />

        {news.length === 0 ? (
          <Typography variant="body1" sx={{ mt: 2 }}>
            Aucune News disponible
          </Typography>
        ) : (
          <>
            <Grid container spacing={3}>
              {currentNews.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item._id}>
                  <NewsCard
                    news={item} // Pass a single news object
                    onEdit={handleEditNews}
                    onDelete={handleDeleteNews}
                    onLike={() => handleLike(item._id)}
                    onDislike={() => handleDislike(item._id)}
                    currentUser={user}
                    isLoading={actionLoading[item._id] || 
                              actionLoading[`like-${item._id}`] || 
                              actionLoading[`dislike-${item._id}`]}
                  />
                </Grid>
              ))}
            </Grid>

            {pageCount > 1 && (
              <Box display="flex" justifyContent="center" mt={4}>
                <Pagination 
                  count={pageCount} 
                  page={page} 
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default News;
