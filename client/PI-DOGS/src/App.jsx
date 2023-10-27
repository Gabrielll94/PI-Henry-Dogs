import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Views/Home/Home";
import Landing from "./Views/Landing/Landing";
import Form from "./Views/Form/Form";
import Details from "./Views/Details/Details";
import NavBar from "./Components/NavBar/NavBar";

function App() {

  return (
      <div>
        <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" Component={Landing}/>
          <Route path="/home" Component={Home}/>
          <Route path="/details:id" Component={Details}/>
          <Route path="/form" Component={Form}/>
        </Routes>
        </BrowserRouter>
      </div>
  )
}

export default App
