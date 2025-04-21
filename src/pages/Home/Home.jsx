// src/components/Home.jsx
import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthProvider.jsx';
import {Hero, Dashboard} from '../../components/index.js';
import { useNavigate } from 'react-router-dom';


export default function Home(){
  const { user } = useAuth();



  return user ? <Dashboard /> : <Hero />;
};


