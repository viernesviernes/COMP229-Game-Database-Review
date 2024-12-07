import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Navbar from "./Navbar";
import "./HomePage.css";

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [sliderGames, setSliderGames] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(
          "https://api.rawg.io/api/games?key=5b98ed2b9ead46e3a6c09e45ae262fc3&page_size=50"
        );
        const data = await response.json();
        setGames(data.results || []);
        setSliderGames(getRandomGames(data.results || [], 3));
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);

  const getRandomGames = (gamesArray, count) => {
    const shuffled = [...gamesArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        sliderGames.length > 0 ? (prevSlide + 1) % sliderGames.length : 0
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderGames]);

  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    const sliderMatches = sliderGames.filter((game) =>
      game.name.toLowerCase().includes(query.toLowerCase())
    );

    if (sliderMatches.length > 0) {
      setSearchResults(sliderMatches);
    } else {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=5b98ed2b9ead46e3a6c09e45ae262fc3&search=${query}`
        );
        const data = await response.json();
        setSearchResults(data.results || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

  if (games.length === 0) {
    return <p>Loading games...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="home-container">
        <main className="main-content">
          <div className="welcome-message">
            <h1>The GameSphere</h1>
            <p>
              Explore our comprehensive game database. Search by title, genre,
              or platform to find the information you need.
            </p>
            <input
              type="text"
              className="search-bar"
              placeholder="Enter a game name"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          {searchResults.length === 0 ? (
            <div className="circular-slider">
              {sliderGames.map((game, index) => {
                const position =
                  (index - currentSlide + sliderGames.length) %
                  sliderGames.length;

                let className = "slider-item";
                if (position === 0) className += " center";
                else if (position === 1) className += " right";
                else if (position === sliderGames.length - 1)
                  className += " left";

                return (
                  <Link
                    key={game.id}
                    to={`/games/${game.id}`} 
                    className={className}
                    style={{
                      backgroundImage: `url(${game.background_image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {position === 0 && <h3 className="game-title">{game.name}</h3>}
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="search-results">
              {searchResults.map((game) => (
                <Link
                  key={game.id}
                  to={`/games/${game.id}`} // Add link to the game details page
                  className="search-result-item"
                  style={{
                    backgroundImage: `url(${game.background_image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h3 className="game-title">{game.name}</h3>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default HomePage;
