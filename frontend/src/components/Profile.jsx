import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import Navbar from './Navbar'
import styles from './profile.module.css'
import emptyGameImage from './emptygame.jpg'

function Profile() {

    const { username } = useParams();

    // Favorites = 0, Replies = 1
    const [tabs, changeTabs] = useState(0);

    return (
        <>
        <Navbar />
        <div className={styles.container}>
            <div className={styles.head}>
            <h3>@{username}</h3>
            </div>
            <div className={styles.tabs}>
                <ul>
                    <li className={tabs == 0 ? styles.active : styles.inactive}>
                        <button onClick={() => {changeTabs(0)}} disabled={tabs == 0}>Favorites</button>
                    </li>
                </ul>
                {tabs == 0 ? <FPagination /> : <RPagination />}
            </div>
        </div>
        </>
    )
}

function FPagination() {

    const { username } = useParams();

    const [games, setGames] = useState([]);

    const fetchData = async () => {
        let json = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/profile/${username}`);
        let response = await json.json();

        let { favorites } = await response[0];
        
        const fetchPromises = favorites.map(async (id) => {
            let gamesJson = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/games/id/${id}`);
            return gamesJson.json();
        });
        
        const allGames = await Promise.all(fetchPromises);  
        
        setGames(allGames);
        console.log("data fetched");
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
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
              <p>Platforms: {game.platforms?.map((p) => p.platform.name).join(", ")}</p>
              <p>{game.short_description || "No description available"}</p>
            </div>
          ))}
        </div>
        </>
    )
}

function RPagination() {
    return (
        <>
        
        </>
    )
}

export default Profile