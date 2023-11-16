// dependencies //
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// context //
import { AuthContext } from '../context/AuthContext';
// assets //

const ProfileContainer = styled.div`
    width: 100%;
    height: calc(100vh - 100px);

    
`;


const Profile = () => {
    const  { consumer, setConsumer } = useContext(AuthContext);

    const navigate = useNavigate();

    return (
        <ProfileContainer>
            <div>
                <h1>{consumer.firstName}</h1>
            </div>
        </ProfileContainer>
    );
}
export default Profile;