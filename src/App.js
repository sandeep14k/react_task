import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './home';
import Login from './login';
import SignUp from './signup';
import Blogdetail from './blogdetail';
import Sub from './sub';
function App() {
  return (
    
  <BrowserRouter>
  <Routes>
   <Route index element={<Login />} />
   <Route expact path='signup' element={<SignUp />} />
   <Route path='home' element={<Home />}/>
   <Route expact path='blogs/:id' element={<Blogdetail />} />
   <Route expact path='sub' element={<Sub />}/>
  </Routes>
  </BrowserRouter>
  );
}

export default App;
