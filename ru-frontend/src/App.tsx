import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import UserPages from './pages/UserPages/UserPages'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/user/*" element={<UserPages />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
