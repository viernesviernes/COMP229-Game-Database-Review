import React from 'react'
import { Routes, Route, Link } from "react-router-dom"
import Favorites from './profilecomponents/Favorites'
import Messages from './profilecomponents/Messages'

function Profile() {
    return (
        <>
        <ul>
            <li>
            <Link to='/profile/favorites'>Favorites</Link>
            </li>
            <li>
            <Link to='/profile/messages'>Messages</Link>
            </li>
        </ul>
        <Routes>
            <Route path='/favorites' element = { <Favorites /> } />
            <Route path='/messages' element = { <Messages /> } />
        </Routes>
        </>
    )
}

export default Profile