import logo from './logo.svg';
import './App.css';
import Header from './Pages/Shared/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import { useEffect, useState } from 'react';
import Purchase from './Pages/Purchase/Purchase';
import Footer from './Pages/Shared/Footer/Footer';
import LogIn from './Pages/Authentication/LogIn/LogIn';
import SignUp from './Pages/Authentication/SignUp/SignUp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequireAuth from './Pages/Authentication/RequrieAuth/RequireAuth';
import Dashboard from './Pages/Dashboard/Dashboard';
import MyProfile from './Pages/Dashboard/MyProfile/MyProfile';
import AddReview from './Pages/Dashboard/AddReview/AddReview';
import MyOrders from './Pages/Dashboard/MyOrders/MyOrders';
function App() {
  const [dark, setDark] = useState(false);
  return (
    <div className="App bg-base-100" data-theme={dark ? 'halloween' : 'bumblebee'}>
      <Header dark={dark} setDark={setDark} />

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/purchase/:id' element={
          <RequireAuth>
            <Purchase />
          </RequireAuth>
        }></Route>
        <Route path='/dashboard' element={<Dashboard />}>
          <Route index element={<MyProfile />}></Route>
          <Route path='addReview' element={<AddReview />}></Route>
          <Route path='myOrders' element={<MyOrders />}></Route>

        </Route>
        <Route path='/logIn' element={<LogIn />}></Route>
        <Route path='/signUp' element={<SignUp />}></Route>
      </Routes>
      <Footer />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
