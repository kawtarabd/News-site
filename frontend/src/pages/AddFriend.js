import React, { useState } from 'react';
import axios from 'axios';

const AddFriend = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [friends, setFriends] = useState([]);

    // Fonction pour rechercher un utilisateur par nom ou prénom
    const searchFriends = async () => {
        try {
            const response = await axios.get(`http://localhost:5001/api/users/search?query=${searchQuery}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Erreur lors de la recherche d\'amis:', error);
        }
    };

     // Fonction pour ajouter un ami par nom
     const addFriend = async (firstName, lastName) => {
        try {
            const response = await axios.post('http://localhost:5001/api/friends/name', { firstName, lastName });
            alert(response.data.message); // Affiche un message de succès
            setFriends([...friends, response.data.friend]); // Ajoute le nouvel ami à la liste d'amis
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'ami:', error);
        }
    };
    

    return (
        <div>
            <h2>Ajouter un ami</h2>
            <input
                type="text"
                placeholder="Recherchez un ami par nom ou prénom"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={searchFriends}>Rechercher</button>

            <h3>Résultats de recherche</h3>
            <ul>
                {searchResults.length > 0 ? (
                    searchResults.map((user) => (
                        <li key={user._id}>
                            {user.firstName} {user.lastName} 
                            <button onClick={() => addFriend(user.firstName, user.lastName)}>Ajouter comme ami</button>
                        </li>
                    ))
                ) : (
                    <li>Aucun utilisateur trouvé</li>
                )}
            </ul>

            <h3>Liste des amis</h3>
            <ul>
                {friends.length > 0 ? (
                    friends.map((friend) => (
                        <li key={friend._id}>{friend.firstName} {friend.lastName}</li>
                    ))
                ) : (
                    <li>Aucun ami ajouté</li>
                )}
            </ul>
        </div>
    );
};

export default AddFriend;