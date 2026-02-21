
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

import UserProfile from './pages/UserProfile'
import ProtectedRoute from './pages/ProtectedRoute'
function App() {
  console.log("App");
  return (
    <>

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/auth" element={<ProtectedRoute />} /> */}

        <Route path="/profile" element={
          <ProtectedRoute >
            <UserProfile />
          </ProtectedRoute>
        } />

      </Routes>


    </>
  )
}

export default App
