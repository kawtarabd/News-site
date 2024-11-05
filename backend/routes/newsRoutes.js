const express = require('express');
const router = express.Router();
const News = require('../models/News');
const User = require('../models/User');

console.log('News routes loaded');

// Route de test
router.get('/test', (req, res) => {
    res.json({ message: 'News routes are working' });
});

router.get('/news', async (req, res) => {
    try {
        const news = await News.find();
        res.json(news);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ message: error.message });
    }
});

// Votre route POST existante pour créer une news
router.post('/', async (req, res) => {
    try {
        const { title, url, userId } = req.body;
        const news = new News({
            title,
            url,
            user: userId
        });
        await news.save();
        res.status(201).json({ success: true, data: news });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }

});

router.post('/:id/:action', async (req, res) => {
    try {
        const { id, action } = req.params;
        const { userId } = req.body;

        // Validation de l'action
        if (!['like', 'dislike'].includes(action)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid action. Must be either "like" or "dislike"' 
            });
        }

        const news = await News.findById(id);
        if (!news) {
            return res.status(404).json({ 
                success: false, 
                message: 'News not found' 
            });
        }

        const isLiked = news.likes.includes(userId);
        const isDisliked = news.dislikes.includes(userId);

        // Logique pour gérer les likes et dislikes
        if (action === 'like') {
            if (isLiked) {
                // Si déjà liké, on retire le like
                news.likes = news.likes.filter(id => id.toString() !== userId);
            } else {
                // On ajoute le like et on retire le dislike s'il existe
                news.likes.push(userId);
                news.dislikes = news.dislikes.filter(id => id.toString() !== userId);
            }
        } else if (action === 'dislike') {
            if (isDisliked) {
                // Si déjà disliké, on retire le dislike
                news.dislikes = news.dislikes.filter(id => id.toString() !== userId);
            } else {
                // On ajoute le dislike et on retire le like s'il existe
                news.dislikes.push(userId);
                news.likes = news.likes.filter(id => id.toString() !== userId);
            }
        }

        await news.save();

        return res.status(200).json({
            success: true,
            data: news,
            message: `${action} updated successfully`
        });
    } catch (error) {
        console.error('Error in like/dislike route:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while processing like/dislike'
        });
    }
});

router.post('/:id/comment', async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, content } = req.body;

        const news = await News.findById(id);
        if (!news) {
            return res.status(404).json({ success: false, error: 'News not found' });
        }

        news.comments.push({ user: userId, content });
        await news.save();

        res.json({ success: true, data: news });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const news = await News.findById(req.params.id)
            .populate('user', 'firstName lastName')
            .populate('likes', 'firstName lastName')
            .populate('dislikes', 'firstName lastName')
            .populate('comments.user', 'firstName lastName');

        if (!news) {
            return res.status(404).json({ success: false, error: 'News not found' });
        }

        res.json({ success: true, data: news });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

module.exports = router;