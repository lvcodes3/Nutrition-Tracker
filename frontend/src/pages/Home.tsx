// dependencies //
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// context //
import { AuthContext } from '../context/AuthContext';

const AuthHomeContainer = styled.div`
    border: 1px solid red;
    width: 100%;
    min-height: 100%;
    background-color: #D9D9D9;
    display: flex;
    flex-direction: column;

    #user-header-div {
        border: 1px solid black;
        
        h1, h2 {
            margin: 10px 0 10px 0;
            text-align: center;
        }
    }

    #static-meal-div {
        
    }
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
                    <div id='user-header-div'>
                        <h1>Nutrition Tracker</h1>
                        <h2>Welcome back, {user.firstName}!</h2>
                    </div>
                    <div id='static-meal-div'>
                        <p>test</p>
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