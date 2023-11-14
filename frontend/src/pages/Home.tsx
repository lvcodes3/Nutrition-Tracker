// dependencies //
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// context //
import { AuthContext } from '../context/AuthContext';
// pages //
import AuthHome from './AuthHome';
import UnauthHome from './UnauthHome';

const Home = () => {
    const { user, setUser } = useContext(AuthContext);

    return (
        <>
        {
            user.authenticated ? (
                <AuthHome />
            ) : (
                <UnauthHome />
            )
        }
        </>
    );
};
export default Home;