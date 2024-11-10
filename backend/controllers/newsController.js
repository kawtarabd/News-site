const News = require('../models/News'); 
const asyncHandler = require('../middleware/async');
const { validationResult } = require('express-validator');

// Fonction pour créer une nouvelle actualité
const createNews = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    if (!req.user || !req.user._id) {
        return res.status(401).json({ success: false, message: "Authentification requise" });
    }

    const { title, url, content, tags } = req.body;

    const newNews = new News({
        title,
        url,
        content,
        tags: tags || [], // Initialiser les tags à un tableau vide si non fournis
        author: req.user._id // Assurez-vous que l'utilisateur est authentifié
    });

    try {
        const savedNews = await newNews.save();
        res.status(201).json({ success: true, data: savedNews });
    } catch (error) {
        console.error('Erreur lors de la création de la news:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur lors de la création de la news' });
    }
};


// Récupérer toutes les actualités
const getAllNews = asyncHandler(async (req, res) => {
    const news = await News.find();
    res.status(200).json({ success: true, data: news });
});

// Gérer les likes
const likeNews = asyncHandler(async (req, res) => {
    const newsId = req.params.id; // ID de l'actualité à aimer

    const news = await News.findById(newsId);
    if (!news) {
        return res.status(404).json({ success: false, message: 'News non trouvée' });
    }

    // Check if the user has already liked the news
    if (news.likes.includes(req.user._id)) {
        return res.status(400).json({ success: false, message: 'Vous avez déjà aimé cette actualité' });
    }

    // Add user ID to likes and save
    news.likes.push(req.user._id);
    await news.save();

    res.status(200).json({ success: true, data: news.likes });
});

// Gérer les dislikes
const dislikeNews = asyncHandler(async (req, res) => {
    const newsId = req.params.id; // ID de l'actualité à ne pas aimer

    const news = await News.findById(newsId);
    if (!news) {
        return res.status(404).json({ success: false, message: 'News non trouvée' });
    }

    // Check if the user has already disliked the news
    if (news.dislikes.includes(req.user._id)) {
        return res.status(400).json({ success: false, message: 'Vous avez déjà détesté cette actualité' });
    }

    // Add user ID to dislikes and save
    news.dislikes.push(req.user._id);
    await news.save();

    res.status(200).json({ success: true, data: news.dislikes });
});

// Ajouter un commentaire
const addComment = asyncHandler(async (req, res) => {
    const newsId = req.params.id;

    if (!req.body.text) {
        return res.status(400).json({ success: false, message: 'Le texte du commentaire est requis' });
    }

    const commentData = {
        user: req.user._id,
        text: req.body.text, // Utilisez `text` pour le contenu du commentaire
    };

    const news = await News.findById(newsId);
    if (!news) {
        return res.status(404).json({ success: false, message: 'News non trouvée' });
    }

    news.comments.push(commentData);
    await news.save();

    res.status(200).json({
        success: true,
        data: news.comments,
    });
});


// Récupérer une actualité par ID
const getNewsById = asyncHandler(async (req, res) => {
    const news = await News.findById(req.params.id).populate('author', 'firstName lastName');
    if (!news) return res.status(404).json({ message: 'News non trouvée' });
    res.json({
        success: true,
        data: {
            url: news.url,
            author: news.author,
            title: news.title,
            dateAdded: news.createdAt,
            likes: news.likes.length,
            dislikes: news.dislikes.length,
            comments: news.comments
        }
    });
});

// Exporter les fonctions
module.exports = {
    createNews,
    getAllNews,
    likeNews,
    dislikeNews,
    addComment,
    getNewsById
};