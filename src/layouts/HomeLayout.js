import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './navbar/index';

export default function HomeLayout() {
  return (
    <>
      <Navbar />

      <Outlet />
    </>
  );
}
