// LatestGames.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./games.module.css"; // Add CSS to match the wireframe
import Navbar from './Navbar'; // Import Navbar
import emptyGameImage from './emptygame.jpg';

const Latest = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch latest games
  const fetchLatestGames = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=5b98ed2b9ead46e3a6c09e45ae262fc3&page=${page}&page_size=12&ordering=-released` // Sort by latest release
      );
      const data = await response.json();
      setGames(data.results);
      setTotalPages(Math.ceil(data.count / 12)); // Update totalPages based on 12 games per page
    } catch (error) {
      console.error("Error fetching latest games:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestGames();
  }, [page]);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1>Latest Games</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className={styles.gamesList}>
            {games.map((game) => (
              <div key={game.id} className={styles.gameCard}>
                <img
                  src={game.background_image  || emptyGameImage}
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
                <p>{game.short_description || "No description available"}</p>
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

export default Latest;
