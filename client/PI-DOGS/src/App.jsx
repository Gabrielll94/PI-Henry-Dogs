import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home/Home'
import LandingContainer from "./Components/Landing/landing"
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
      <div>
        <BrowserRouter>
        <Routes>
          <Route path="/" Component={LandingContainer}/>
          <Route path="/home" Component={Home}/>
        </Routes>
        </BrowserRouter>
      </div>
  )
}

export default App
