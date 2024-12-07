import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styles from "./gameDetails.module.css";
import Navbar from './Navbar'; // Import Navbar
import { UserContext } from '../UserContext';

const GameDetails = () => {
  const { id } = useParams(); // Retrieve the game ID from the URL
  const { user } = useContext(UserContext); // Access the user data from UserContext
  const [gameDetails, setGameDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false); // Track if game is in favorites

  const fetchGameDetails = async () => {
    setLoading(true);
    try {

      // Fetch game data
      const response = await fetch(
        `https://api.rawg.io/api/games/${id}?key=5b98ed2b9ead46e3a6c09e45ae262fc3`
      );
      const data = await response.json();
      setGameDetails(data);

      // Determine if user has it as a favorite
      const fetchedFavs = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/profile/mjviernes`)
      .then(response => {
        return response.json();
      }).then(dict => {
        return dict[0].favorites;
      });

      console.log(fetchedFavs.includes(parseInt(id)));
      setIsFavorite(fetchedFavs.includes(parseInt(id)));

    } catch (error) {
      console.error("Error fetching game details:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToFavourites = async () => {
    try{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/favorites/${user.username}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: gameDetails.id }),
        });
        const result = await response.json();
  
        if (response.ok) {
          setIsFavorite(true);
          alert("Game added to favorites!");
        } else {
          alert(result.error || "Failed to add to favorites.");
        }
    }
    catch(error){
      console.error("Error adding to favorites: ", error);
    }
  };

  const removeToFavourites = async () => {
    try{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/favorites/${user.username}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: gameDetails.id }),
        });
        const result = await response.json();
  
        if (response.ok) {
          setIsFavorite(false);
          alert("Game removed from favorites!");
        } else {
          alert(result.error || "Failed to remove from favorites.");
        }
    }
    catch(error){
      console.error("Error removing from favorites: ", error);
    }
  };

  useEffect(() => {
    fetchGameDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!gameDetails) {
    return <p>Game not found.</p>;
  }

  return (
    <>
    <Navbar />
    <div className={styles.container}>
      <h1>{gameDetails.name}</h1>
      <img
        src={gameDetails.background_image}
        alt={gameDetails.name}
        className={styles.gameImage}
      />
      <div className={styles.favourites}> 
      {!isFavorite ? <button onClick={addToFavourites} id="buttonAdd">Add to Favorites</button> : 
      <button onClick={removeToFavourites} id="buttonRemove">Remove to Favorites</button>}
      </div>
      <div className={styles.details}>
        <p><strong>Release Date:</strong> {gameDetails.released}</p>
        <p><strong>Rating:</strong> {gameDetails.rating}</p>
        <p><strong>Genres:</strong> {gameDetails.genres?.map((genre) => genre.name).join(", ")}</p>
        <p><strong>Platforms:</strong> {gameDetails.platforms?.map((platform) => platform.platform.name).join(", ")}</p>
        <p><strong>Description:</strong> {gameDetails.description_raw}</p>
      </div>
    </div>
    </>
  );
};

export default GameDetails;
