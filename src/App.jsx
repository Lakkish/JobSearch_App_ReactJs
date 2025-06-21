import {Routes, Route, Navigate} from 'react-router-dom'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRouter'
import Home from './components/Home'
import Jobs from './components/Jobs'
import './App.css'


const App = () =>(
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
    <Route path="/jobs" element={<ProtectedRoute><Jobs/></ProtectedRoute>} />
  </Routes>
)

export default App
