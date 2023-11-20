//Componentes esenciales para configurar el enrutamiento en una aplicación React.
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import LandingContainer from './Components/Landing/landing';
import Home from './Components/Home/Home';
import DogDetail from './Components/Detail/DogDetail';
import About from '../src/Components/About/About';
import CreateDog from './Components/Form/CreateDog';

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route exact path='/' element={<LandingContainer />} />
        <Route path='/home' element={<Home />} /> 
        <Route path='/dogs/:id' element={<DogDetail />}/> 
        <Route path='/newDog/' element={<CreateDog />}/>
        <Route path='/about' element={<About />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App