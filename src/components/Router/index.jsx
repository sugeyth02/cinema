import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../../layout';
import Bookings from '../../pages/bookings';
import Login from '../../pages/login';
import Movies from '../../pages/movies';
import Register from '../../pages/register';
import Reserve from '../../pages/reserve';
import TodayMovies from '../../pages/todayMovies';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<Layout />}>
          <Route path='/today' element={<TodayMovies />} />
          <Route path='/today/:id' element={<Reserve />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/bookings' element={<Bookings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
