import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import Main from './components/Main.jsx'
import SearchPage from './pages/SearchPage.jsx'
import NewsPage from './pages/NewsPage.jsx'
import PostPage from './pages/PostPage.jsx'
import { ToastContainer } from 'react-toastify';
import ProjectPage from './pages/ProjectPage.jsx'
import QuestionPage from './pages/QuestionPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import UserProfile from './pages/UserProfile.jsx'
const App = () => {
  return (
    <div>
      <ToastContainer position='top-right' autoClose={3000}/>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/main" element={<Main />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path='/news' element={ <NewsPage />} />
        <Route path='/post' element={ <PostPage />} />
        <Route path='/project' element={ <ProjectPage />} />
        <Route path='/questions' element={ <QuestionPage />} />
        <Route path='/profile' element={ <ProfilePage />} />
        <Route path="/user/:username" element={<UserProfile />} />
      </Routes>
    </div>
  )
}

export default App
