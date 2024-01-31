import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './home';
import Login from './login';
import Blogdetail from './blogdetail';
function App() {
  return (
  <BrowserRouter>
  <Routes>
   <Route index element={<Login />} />
   <Route path='home' element={<Home />}/>
   <Route expact path='blogs/:id' element={<Blogdetail />} />
  </Routes>
  </BrowserRouter>
  );
}

export default App;
