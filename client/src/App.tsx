import { useState, useEffect } from 'react'
import './App.css'

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
    <div>
      <h1> {message} </h1>
    </div>
  );
}

export default App;
