import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import DashboardHome from './pages/DashboardHome';
import DashboarProducts from './pages/DashboarProducts';
import DashboardUser from './pages/DashboardUser';
import DashboardOrders from './pages/DashboardOrders';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/dashboard/home' element={<DashboardHome />} />
      <Route path='/dashboard/products' element={<DashboarProducts />} />
      <Route path='/dashboard/users' element={<DashboardUser />} />
      <Route path='/dashboard/orders' element={<DashboardOrders />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
