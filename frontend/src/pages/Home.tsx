// dependencies //
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// context //
import { AuthContext } from '../context/AuthContext';

const AuthHomeContainer = styled.div`
    width: 100%;
    height: auto;
    background-color: #D9D9D9;
`;

const UnauthHomeContainer = styled.div`
width: 100%;
height: auto;
background-color: #D9D9D9;
`;

const Home = () => {
    const { user, setUser } = useContext(AuthContext);

    return (
        <>
        {
            user.authenticated ? (
                <AuthHomeContainer>
                    <div>
                        <h1>Welcome back, {user.firstName}!</h1>
                    </div>
                </AuthHomeContainer>
            ) : (
                <UnauthHomeContainer>
                    <div>
                        <h1>Welcome to Nutrition Tracker!</h1>
                    </div>
                    <div>
                        <p>
                            Do you want to keep track of your nutritional facts in all of your meals?
                            If so, please login or create an account so you can start tracking today!
                        </p>
                    </div>
                </UnauthHomeContainer>
            )
        }
        </>
    );
};
export default Home;