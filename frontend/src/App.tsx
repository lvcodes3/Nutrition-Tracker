// dependencies //
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// context //
import { ConsumerType, initialConsumer, AuthContext } from './context/AuthContext';
// pages //
import Home from './pages/Home';
import Meals from './pages/Meals';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
// components //
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [consumer, setConsumer] = useState<ConsumerType>(initialConsumer);

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/v1/consumer/auth',
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.ok) {
          const authenticatedConsumer = await response.json();
          setConsumer({
            ...authenticatedConsumer,
            authenticated: true
          });
        }
      } 
      catch (err) {
        console.log(`Fetch error: ${err}`);
      }
    }
    authenticateUser();
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ consumer, setConsumer }}>
        <Router>
          <ToastContainer />
          <Navbar />
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/meals' element={ <Meals /> } />
            <Route path='/profile' element={ <Profile /> } />
            <Route path='/register' element={ <Register /> } />
            <Route path='/login' element={ <Login /> } />
          </Routes>
          <Footer />
        </Router>
      </AuthContext.Provider>
    </>
  );
}
export default App;
