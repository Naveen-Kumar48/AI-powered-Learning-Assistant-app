import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
          const App = () => {
  const isAuthenticated=false;
  const loading =false
  if(loading){
    return(
      <div className=''>
        <p>Loading...</p>
      </div>
    )
  }
  return(
    <Router>
      <Routes>
<Route  path='/' element={isAuthenticated? <Navigate to="/dashboard" replace/> :<Navigate to="/login" replace />}/>
<Route path='/login' element={<Login/>} />
<Route path='/register' element={<Register/>} />
      </Routes>
    </Router>
  )

  }

export default App