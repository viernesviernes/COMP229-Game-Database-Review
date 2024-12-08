import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./games.module.css"; 
import Navbar from './Navbar';
import emptyGameImage from './emptygame.jpg';

const Genre = () => {
  const { genre } = useParams(); // Extract genre from URL parameters
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
    
  const fetchGamesByGenre = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=5b98ed2b9ead46e3a6c09e45ae262fc3&page=${page}&page_size=12&genres=${genre}`
      );
      const data = await response.json();
      setGames(data.results);
      setTotalPages(Math.ceil(data.count / 12)); // Update total pages based on 12 games per page
    } catch (error) {
      console.error("Error fetching games by genre:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGamesByGenre();
  }, [genre, page]);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 style={{ textAlign: "center", color: "#bb86fc" }}>
          Games in Genre:{" "} 
          {(() => {
          const genreMapping = {
            "role-playing-games-rpg": "RPG",
            "massively-multiplayer": "MMO",
            "first-person-shooter": "FPS",
            // Add other mappings here as needed
          };

          return genreMapping[genre] || genre.charAt(0).toUpperCase() + genre.slice(1);
          })()}
        </h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className={styles.gamesList}>
            {games.map((game) => (
              <div key={game.id} className={styles.gameCard}>
                <img
                  src={game.background_image || emptyGameImage}
                  alt={game.name}
                  className={styles.gameImage}
                />
                <h3>
                  <Link to={`/games/${game.id}`} className={styles.gameLink}>
                    {game.name}
                  </Link>
                </h3>
                <p>Rating: {game.rating ? `${game.rating}/5` : "N/A"}</p>
                <p>
                  Platforms:{" "}
                  {game.platforms?.map((p) => p.platform.name).join(", ")}
                </p>
                <p>{game.short_description || "Click to view description"}</p>
              </div>
            ))}
          </div>
        )}
        <div className={styles.pagination}>
          <button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Genre;