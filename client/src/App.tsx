import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router';
import { Navbar } from './components/layouts/Navbar';
import { Home } from './components/Home';
import { Register } from './components/Register';

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
    <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path="/" element={ <Home /> }/>
          <Route path="/register" element={ <Register/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
