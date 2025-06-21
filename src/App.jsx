import {Routes, Route, Navigate} from 'react-router-dom'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRouter'
import Home from './components/Home'
import './App.css'


const App = () =>(
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
  </Routes>
)

export default App
