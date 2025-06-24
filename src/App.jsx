import {Routes, Route, Navigate} from 'react-router-dom'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRouter'
import Home from './components/Home'
import Jobs from './components/Jobs'
import JobItemDetails from './components/JobItemDetails'
import NotFound from './components/NotFound'

import { Analytics } from '@vercel/analytics/react'


import './App.css'


const App = () =>(
  <>
    <Analytics />

    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
      <Route path="/jobs" element={<ProtectedRoute><Jobs/></ProtectedRoute>} />
      <Route path="/jobs/:id" element={<ProtectedRoute><JobItemDetails/></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
)

export default App
