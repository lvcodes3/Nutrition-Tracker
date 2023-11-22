// dependencies //
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// context //
import { ConsumerType, initialConsumer, AuthContext } from './context/AuthContext';
// pages //
import AuthHome from './pages/AuthHome';
import UnauthHome from './pages/UnauthHome';
import Meals from './pages/Meals';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Register from './pages/Register';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
// components //
import AuthNavbar from './components/AuthNavbar';
import UnauthNavbar from './components/UnauthNavbar';
import Footer from './components/Footer';

function App() {
  const [consumer, setConsumer] = useState<ConsumerType>(initialConsumer);
  const [displayDate, setDisplayDate] = useState<null | string>(null);
  const [queryDate, setQueryDate] = useState<null | string>(null);

  useEffect(() => {
    const getCurrentDate = () => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentDay = currentDate.getDate();
      const currentYear = currentDate.getFullYear();
      setDisplayDate(`${currentMonth}/${currentDay}/${currentYear}`);
      setQueryDate(`${currentYear}-${currentMonth}-${currentDay}`);
    }

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
      getCurrentDate();
    }

    authenticateUser();
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ consumer, setConsumer }}>
        <Router>
          <ToastContainer />
          {
            consumer.authenticated ? (
              <>
                <AuthNavbar />
                <Routes>
                  <Route path='/' element={ <AuthHome /> } />
                  <Route path='/meals' element={ <Meals displayDate={displayDate} setDisplayDate={setDisplayDate} queryDate={queryDate} setQueryDate={setQueryDate} /> } />
                  <Route path='/profile' element={ <Profile displayDate={displayDate} setDisplayDate={setDisplayDate} queryDate={queryDate} setQueryDate={setQueryDate} /> } />
                  <Route path='/friendSearch' element={ <Search /> } />
                  <Route path='/register' element={ <Register /> } />
                  <Route path='/login' element={ <Login /> } />
                  <Route path='*' element={ <NotFound /> } />
                </Routes>
                <Footer />
              </>
            ) : (
              <>
                <UnauthNavbar />
                <Routes>
                  <Route path='/' element={ <UnauthHome /> } />
                  <Route path='/register' element={ <Register /> } />
                  <Route path='/login' element={ <Login /> } />
                  <Route path='*' element={ <NotFound /> } />
                </Routes>
                <Footer />
              </>
            )
          }
        </Router>
      </AuthContext.Provider>
    </>
  );
}
export default App;
