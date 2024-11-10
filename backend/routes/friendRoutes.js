// routes/friendRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');




// Récupérer l'utilisateur et peupler ses amis
router.get('/profile', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select('-password')  // Exclure le mot de passe
            .populate('friends', 'firstName lastName'); // Peupler les amis avec leur prénom et nom
        
        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération du profil utilisateur'
        });
    }
});

// Route pour ajouter un ami par nom
router.post('/friends/name', protect, async (req, res) => {
    const { firstName, lastName } = req.body;  // Récupérer les informations du nom de l'ami

    try {
        const userId = req.user._id;  // L'ID de l'utilisateur connecté
        const friend = await User.findOne({ firstName, lastName });

        if (!friend) {
            return res.status(404).json({ message: 'Ami non trouvé' });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Vérifier si l'ami est déjà dans la liste d'amis
        if (!user.friends.includes(friend._id)) {
            user.friends.push(friend._id);
            await user.save();
            return res.status(200).json({ message: 'Ami ajouté avec succès', friend });
        } else {
            return res.status(400).json({ message: 'Vous êtes déjà amis' });
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'ami :", error);
        res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'ami' });
    }
});

module.exports = router;
