import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styles from "./gameDetails.module.css";
import Navbar from './Navbar';
import { UserContext } from '../UserContext';

const GameDetails = () => {
  const { id } = useParams(); // Retrieve the game ID from the URL
  const { user } = useContext(UserContext); // Access the user data from UserContext
  const [gameDetails, setGameDetails] = useState(null);
  const [loading, setLoading] = useState(true); // General loading state for the page
  const [favoritesLoading, setFavoritesLoading] = useState(true); // Loading state for favorites
  const [isFavorite, setIsFavorite] = useState(false); // Track if game is in favorites

  const fetchGameDetails = async () => {
    try {
      setLoading(true);

      // Fetch game data
      const response = await fetch(
        `https://api.rawg.io/api/games/${id}?key=5b98ed2b9ead46e3a6c09e45ae262fc3`
      );
      const data = await response.json();
      setGameDetails(data);
    } catch (error) {
      console.error("Error fetching game details:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkFavorites = async () => {
    try {
      setFavoritesLoading(true);

      // Fetch user's favorites
      const fetchedFavs = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/api/profile/${user.username}`
      )
        .then((response) => response.json())
        .then((dict) => {dict[0].favorites || [];
          console.log(dict[0].favorites)
        });

      // Check if the current game is in favorites
      console.log(user.username)
      console.log(fetchedFavs);

      const fetchedFavIds = fetchedFavs.map((fav) => Number(fav.id));
      setIsFavorite(fetchedFavIds.includes(Number(id)));
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setFavoritesLoading(false);
    }
  };

  const addToFavorites = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/favorites/${user.username}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: gameDetails.id }),
      });
      if (response.ok) {
        setIsFavorite(true);
        alert("Game added to favorites!");
      } else {
        alert("Failed to add to favorites.");
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const removeFromFavorites = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/favorites/${user.username}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: gameDetails.id }),
      });
      if (response.ok) {
        setIsFavorite(false);
        alert("Game removed from favorites!");
      } else {
        alert("Failed to remove from favorites.");
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  useEffect(() => {
    fetchGameDetails();
    checkFavorites();
  }, [id]);

  if (loading) {
    return <p>Loading game details...</p>;
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
          {favoritesLoading ? (
            <p>Checking favorites...</p>
          ) : isFavorite ? (
            <button onClick={removeFromFavorites} id="buttonRemove">
              Remove from Favorites
            </button>
          ) : (
            <button onClick={addToFavorites} id="buttonAdd">
              Add to Favorites
            </button>
          )}
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
