const News = require('../models/News');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all news
// @route   GET /api/news
// @access  Public
exports.getNews = asyncHandler(async (req, res, next) => {
  const news = await News.find().populate('user', 'name');

  res.status(200).json({
    success: true,
    count: news.length,
    data: news,
  });
});

// @desc    Create new news
// @route   POST /api/news
// @access  Private
exports.createNews = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const news = await News.create(req.body);

  res.status(201).json({
    success: true,
    data: news,
  });
});

// @desc    Like news
// @route   PUT /api/news/:id/like
// @access  Private
exports.likeNews = asyncHandler(async (req, res, next) => {
  let news = await News.findById(req.params.id);

  if (!news) {
    return next(new ErrorResponse(`News not found with id of ${req.params.id}`, 404));
  }

  if (news.likes.includes(req.user.id)) {
    return next(new ErrorResponse(`You have already liked this news`, 400));
  }

  news.likes.push(req.user.id);
  news.dislikes = news.dislikes.filter(
    (userId) => userId.toString() !== req.user.id.toString()
  );

  news = await news.save();

  res.status(200).json({
    success: true,
    data: news,
  });
});

// @desc    Dislike news
// @route   PUT /api/news/:id/dislike
// @access  Private
exports.dislikeNews = asyncHandler(async (req, res, next) => {
  let news = await News.findById(req.params.id);

  if (!news) {
    return next(new ErrorResponse(`News not found with id of ${req.params.id}`, 404));
  }

  if (news.dislikes.includes(req.user.id)) {
    return next(new ErrorResponse(`You have already disliked this news`, 400));
  }

  news.dislikes.push(req.user.id);
  news.likes = news.likes.filter(
    (userId) => userId.toString() !== req.user.id.toString()
  );

  news = await news.save();

  res.status(200).json({
    success: true,
    data: news,
  });
});

// @desc    Add comment to news
// @route   POST /api/news/:id/comments
// @access  Private
exports.addComment = asyncHandler(async (req, res, next) => {
  const news = await News.findById(req.params.id);

  if (!news) {
    return next(new ErrorResponse(`News not found with id of ${req.params.id}`, 404));
  }

  const comment = { ```javascript
    user: req.user.id,
    text: req.body.text,
  };

  news.comments.push(comment);
  await news.save();

  res.status(201).json({
    success: true,
    data: news.comments,
  });
 
});