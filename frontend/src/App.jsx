
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart/Cart'
import UserProfile from './pages/UserProfile'
import ProtectedRoute from './pages/ProtectedRoute'
import Payment from './pages/Payment/Payment'
import AdminCourseForm from './pages/AdminCourseForm/AdminCourseForm'
import Upload from './pages/Upload'
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

        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />


        <Route path="/AdminCourseForm" element={<AdminCourseForm />} />



        <Route path="/Upload" element={<Upload />} />


      </Routes>


    </>
  )
}

export default App
