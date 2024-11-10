const express = require('express');
const newsController = require('../controllers/newsController'); // Assurez-vous que le chemin est correct
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   POST api/news
// @desc    Create a new news
// @access  Private
router.post('/', protect, newsController.createNews);

// @route   GET api/news
// @desc    Get all news
// @access  Public
router.get('/', newsController.getAllNews);

// @route   GET api/news/:id
// @desc    Get a specific news by ID
// @access  Public
router.get('/:id', newsController.getNewsById);

// @route   PUT api/news/:id/like
// @desc    Like a news
// @access  Private
router.put('/:id/like', protect, newsController.likeNews);

// @route   PUT api/news/:id/dislike
// @desc    Dislike a news
// @access  Private
router.put('/:id/dislike', protect, newsController.dislikeNews);

// @route   POST api/news/comment/:id
// @desc    Comment on a news
// @access  Private
router.post('/comment/:id', protect, newsController.addComment);

module.exports = router;
