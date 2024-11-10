const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes
const protect = async (req, res, next) => {
    let token;

    // Vérifiez la présence du token dans les en-têtes d'authentification
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // Si aucun token n'est trouvé, retournez une erreur
    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized, no token provided' });
    }

    try {
        // Décoder le token pour récupérer l'ID de l'utilisateur
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Chercher l'utilisateur dans la base de données
        req.user = await User.findById(decoded.userId);
        
        // Si l'utilisateur n'est pas trouvé, retournez une erreur
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Unauthorized, user not found' });
        }
        
        // Passez au middleware suivant ou au contrôleur
        next();
    } catch (error) {
        console.error('Erreur dans le middleware protect:', error);
        
        // Différencier le message si le token est expiré ou invalide
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Unauthorized, token expired' });
        } else {
            return res.status(401).json({ success: false, message: 'Unauthorized, invalid token' });
        }
    }
};

module.exports = { protect };
