import React from 'react'
import Home from './Home.jsx';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
const navigate=useNavigate();

  return (
    navigate('/')
  );
}

export default Dashboard
