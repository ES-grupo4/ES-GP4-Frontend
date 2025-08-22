import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import UserPages from './pages/UserPages/UserPages'
import { useState } from 'react'
import Dashboard from './pages/UserPages/Dashboard'

function App() {

  const [logged, setLogged] = useState(false)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login logged={logged} setLogged={setLogged}/>}/>
          <Route path="/user/*" element={<UserPages />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
