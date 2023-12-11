import './App.scss'
import Home from './pages/home/Home'
import { Routes, Route } from 'react-router-dom'
import Nav from './layout/nav/Nav'
import Login from './Routes/login/Login'
import Signup from './Routes/signup/Signup'
import Blogpost from './pages/blogpost/Blogpost'
import Dashboard from './Routes/dashboard/Dashboard'
import Signout from './Routes/signout/Signout'
import Managepost from './Routes/managepost/Managepost'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  

  return (
    <>
    <Nav />
    <Routes>
      <Route path='' element={<Home/>} />
      <Route path='blog-post/:id' element={<Blogpost/>} />
      <Route path="login" element={<Login/>} >
        <Route path='signup' element={<Signup/>} />
      </Route>
      <Route path='dashboard' element={<Dashboard/>} />
      <Route path='signout' element={<Signout/>} />
      <Route path='managepost' element={<Managepost/>}  /> 
      <Route path="signup" element={<Signup/>} >
        <Route path='login' element={<Login/>} />
      </Route>
    </Routes>
    <ToastContainer />
    </>
  )
}


export default App
