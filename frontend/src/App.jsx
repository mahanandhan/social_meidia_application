import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import Main from './components/Main.jsx'
import SearchPage from './pages/SearchPage.jsx'
import NewsPage from './pages/NewsPage.jsx'
import PostPage from './pages/PostPage.jsx'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/main" element={<Main />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path='/news' element={ <NewsPage />} />
        <Route path='/post' element={ <PostPage />} />
      </Routes>
    </div>
  )
}

export default App
