import logo from './logo.svg';
import './App.css';
import Header from './Pages/Shared/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import { useEffect, useState } from 'react';
import Purchase from './Pages/Purchase/Purchase';
import Footer from './Pages/Shared/Footer/Footer';

function App() {
  const [dark, setDark] = useState(false);

  return (
    <div className="App bg-base-100" data-theme={dark ? 'halloween' : 'bumblebee'}>
      <Header dark={dark} setDark={setDark} />

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/purchase/:id' element={<Purchase />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
