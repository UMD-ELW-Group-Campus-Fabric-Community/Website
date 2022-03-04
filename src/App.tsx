import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import * as Pages from './routing/_';

import logo from './logo.svg';


const routes = (
  <Routes>
    {/* Instantiate Routes in respective pages */}
    <Route path="/" element={<Pages.Home />} /> 
    <Route path="/404" element={<Pages.NotFound />} />
    <Route path="/*" element={<Pages.NotFound />} />

  </Routes>
)
export default function App () {
  return routes;  
}