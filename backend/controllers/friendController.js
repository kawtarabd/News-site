const User = require('../models/User');
const Friend = require('../models/Friend');

// Fonction pour rechercher un utilisateur par son nom
const getUserByName = async (req, res) => {
    try {
        if (!req.params.name) {
            return res.status(400).json({ message: 'Nom de l\'utilisateur requis' });
        }

        const user = await User.findOne({ name: { $regex: req.params.name, $options: 'i' } });  // Recherche insensible à la casse
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.json(user);  // Retourne les informations de l'utilisateur trouvé
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
};

// Fonction pour ajouter un ami
const addFriend = async (req, res) => {
    try {
        const user = await User.findOne({ name: { $regex: req.params.name, $options: 'i' } });  // Recherche insensible à la casse
        if (!user) {
            return res.status(404).json({ message: 'Ami non trouvé' });
        }

        const currentUser = await User.findById(req.user.id);
        if (currentUser.friends.includes(user._id)) {
            return res.status(400).json({ message: 'Cet utilisateur est déjà votre ami' });
        }

        currentUser.friends.push(user._id);  // Ajouter l'ami à la liste des amis
        await currentUser.save();

        res.json({ message: 'Ami ajouté avec succès' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
};

// Fonction pour supprimer un ami
const removeFriend = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const friend = await User.findById(req.params.id);

        if (!friend) {
            return res.status(404).json({ message: 'Ami non trouvé' });
        }

        // Vérifier que l'ami est bien dans la liste des amis de l'utilisateur connecté
        if (!user.friends.includes(friend._id)) {
            return res.status(400).json({ message: 'Vous n\'êtes pas amis avec cet utilisateur' });
        }

        // Supprimer la relation d'amitié
        user.friends = user.friends.filter(friendId => !friendId.equals(friend._id));
        await user.save();

        res.json({ message: 'Ami retiré avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'ami:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Fonction pour rechercher des utilisateurs par nom ou prénom
const searchFriends = async (req, res) => {
    try {
        const query = req.params.query;
        const users = await User.find({
            $or: [
                { firstName: { $regex: query, $options: 'i' } },
                { lastName: { $regex: query, $options: 'i' } }
            ]
        }).select('-password'); // Exclure le mot de passe des résultats

        res.json(users);
    } catch (error) {
        console.error('Erreur lors de la recherche d\'amis:', error);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
};

module.exports = { searchFriends, getUserByName, addFriend, removeFriend };
