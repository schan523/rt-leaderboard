import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router';
import { Navbar } from './components/layouts/Navbar';
import { Home } from './components/Home';
import { Register } from './components/Register';
import { Login } from './components/login/Login';
import { Score } from './components/Score'
import { AuthProvider } from './context/AuthContext';

function App() {
  const [ message, setMessage ] = useState('');
  console.log(message);
  useEffect(() => {
    fetch('/api')
      .then(res => res.text())
      .then(data => setMessage(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path="/" element={ <Home /> }/>
            <Route path="/register" element={ <Register/> }/>
            <Route path="/login" element={ <Login /> }/>
            <Route path="/score" element={ <Score /> } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
