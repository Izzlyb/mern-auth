import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {

  return (
    <div className="flex top-0">
      <div>
        <div className="flex flex-row" >
          <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
          <div className='flex-col'>
            <h1>MERN Application with Authorization</h1>
            <h2>using React.js json web token JWT, redux toolkit cookie</h2>  
          </div>
        </div>
        <BrowserRouter >
          {/* Header Section */}
          <Header />
          <Routes >
            <Route path="/Home" element={<Home/>}/>
            <Route path="/About" element={<About/>}/>
            <Route path="/Profile" element={<Profile/>}/>
            <Route path="/SignUp" element={<SignUp/>}/>
            <Route path="/SignIn" element={<SignIn/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
