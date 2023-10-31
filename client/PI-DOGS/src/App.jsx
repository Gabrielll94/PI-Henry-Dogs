
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingContainer from './Components/Landing/landing';
import Home from './Components/Home/Home';
import DogDetails from './Components/Detail/Detail';
import FormAddDog from './Components/Form/Form';
import About from './Components/About/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingContainer />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<DogDetails />} />
        <Route path="/newBreed" element={<FormAddDog />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
