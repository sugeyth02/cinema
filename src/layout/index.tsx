import React from 'react';
import { Outlet } from 'react-router-dom';
import AppNavbar from '../components/app_navbar';

export default function Layout() {
  return (
    <div className='w-screen h-screen overflow-x-hidden'>
      <AppNavbar />
      <Outlet />
    </div>
  );
}
