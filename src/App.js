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
import 'react-confirm-alert/src/react-confirm-alert.css';
import Payment from './Pages/Payment/Payment';
import MakeAdmin from './Pages/Dashboard/MakeAdmin/MakeAdmin';
import ManageProduct from './Pages/Dashboard/ManageProduct/ManageProduct';
import ManageOrder from './Pages/Dashboard/ManageOrder/ManageOrder';
import AddProduct from './Pages/Dashboard/AddProduct/AddProduct';
import RequireAdmin from './Pages/Authentication/RequrieAuth/RequireAdmin';
function App() {
  const [dark, setDark] = useState(false);
  return (
    <div className="App bg-base-100" data-theme={dark ? 'night' : 'bumblebee'}>
      <Header dark={dark} setDark={setDark} />

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/purchase/:id' element={
          <RequireAuth>
            <Purchase />
          </RequireAuth>
        }></Route>
        <Route path='/payment/:id' element={
          <RequireAuth>
            <Payment />
          </RequireAuth>
        }></Route>
        <Route path='/dashboard' element={<RequireAuth>
          <Dashboard />
        </RequireAuth>}>
          <Route index element={<MyProfile />}></Route>
          <Route path='addReview' element={<AddReview />}></Route>
          <Route path='myOrders' element={<MyOrders />}></Route>
          <Route path='makeAdmin' element={
            <RequireAdmin>
              <MakeAdmin />
            </RequireAdmin>
          }></Route>
          <Route path='manageProducts' element={
            <RequireAdmin>
              <ManageProduct />
            </RequireAdmin>
          }></Route>
          <Route path='manageOrders' element={
            <RequireAdmin>
              <ManageOrder />
            </RequireAdmin>
          }></Route>
          <Route path='addProduct' element={

            <RequireAdmin>
              <AddProduct />
            </RequireAdmin>
          }></Route>

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
