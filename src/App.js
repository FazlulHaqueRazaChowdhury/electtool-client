import logo from './logo.svg';
import './App.css';
import Header from './Pages/Shared/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import { useState } from 'react';

function App() {
  const [dark, setDark] = useState(false);
  return (
    <div className="App" data-theme={dark ? 'mytheme2' : 'mytheme1'}>
      <Header dark={dark} setDark={setDark} />

      <Routes>
        <Route path='/' element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
