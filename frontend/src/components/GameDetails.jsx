import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./gameDetails.module.css";
import Navbar from './Navbar'; // Import Navbar

const GameDetails = () => {
  const { id } = useParams(); // Retrieve the game ID from the URL
  const [gameDetails, setGameDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchGameDetails = async () => {
    setLoading(true);
    try {
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
