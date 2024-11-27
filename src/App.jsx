import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom"
import Login from './components/Login'
import Profile from './components/Profile'
import Signup from './components/Signup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ul>
        <li>
          <Link to='/login'>Log in</Link>
        </li>
        <li>
          <Link to='/signup'>Sign up</Link>
        </li>
        <li>
          <Link to='/profile'>Profile</Link>
        </li>
      </ul>
      <Routes>
        <Route path='/login' element = { <Login /> } />
        <Route path='/signup' element = { <Signup /> } />
        <Route path='/profile/*' element = { <Profile /> } />
      </Routes>
    </>

  )
}

export default App
