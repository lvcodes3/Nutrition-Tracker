// dependencies //
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// context //
import { AuthContext } from '../context/AuthContext';
// assets //
import FoodBanner from './images/food-banner.png';

const AuthHomeContainer = styled.div`
    border: 1px solid red;
    width: 100%;
    height: calc(100vh - 100px);
    background-color: #D9D9D9;

    #user-header-div {
        border: 1px solid black;
        
        h1 {
            margin: 10px 0 10px 0;
            text-align: center;
        }
    }

    #banner-div {
        display: flex;
        justify-content: center;
    }

    #navigation-div {
        border: 1px solid black;
        display: flex;
        justify-content: space-evenly;
        padding: 25px;

        button {
            width: 300px;
            height: 30px;
            cursor: pointer;
            font-weight: bold;
            background-color: white;
            border: 1px solid black;
            border-radius: 10px;
        }
    }

    #static-content-div {
        
    }
`;

const AuthHome = () => {
    const {consumer, setConsumer} = useContext(AuthContext);

    const navigate = useNavigate();

    return (
        <AuthHomeContainer>
            <div id='user-header-div'>
                <h1>Welcome back, {consumer.firstName}!</h1>
            </div>
            <div id='banner-div'>
                <img src={FoodBanner} alt='Food Banner' />
            </div>
            <div id='navigation-div'>
                <button onClick={() => {
                    navigate('/meals')
                }}>
                    Go to your Daily Meals
                </button> 
                <button onClick={() => {
                    navigate('/profile')
                }}>
                    Go to your Profile
                </button>
            </div>
            <div id='static-content-div'>
                <p>Static Content</p>
            </div>
        </AuthHomeContainer>
    )
}
export default AuthHome;