// dependencies //
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// context //
import { AuthContext } from '../context/AuthContext';
// assets //

const ProfileContainer = styled.div`
    width: 100%;
    height: auto;

    
`;


const Profile = () => {
    const  { consumer, setConsumer } = useContext(AuthContext);

    const navigate = useNavigate();

    return (
        <div>
            Profile
        </div>
    );
}
export default Profile;