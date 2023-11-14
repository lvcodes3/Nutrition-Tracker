// dependencies //
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// context //
import { UserType, initialUser, AuthContext } from './context/AuthContext';
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
  const [user, setUser] = useState<UserType>(initialUser);

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/v1/user/auth',
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        console.log(response);

        if (response.ok) {
          const user = await response.json();
          setUser({
              id: user.id,
              firstName: user.first_name,
              email: user.email,
              createdAt: user.created_at,
              updatedAt: user.updated_at,
              lastSignedIn: user.last_signed_in,
              authenticated: true
          });
        }
      } catch (err) {
        console.log(`Fetch error: ${err}`);
      }
    }
    authenticateUser();
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>
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
