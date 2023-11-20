// dependencies //
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// context //
import { AuthContext } from '../context/AuthContext';
// assets //
import FoodBanner from './images/food-banner.png';
import MealsImg from './images/meals.webp';

const AuthHomeContainer = styled.div`
    width: 100%;
    min-height: calc(100vh - 100px);
    background-color: #D9D9D9;

    #user-header-div {        
        h1 {
            margin: 0;
            padding: 10px 0 10px 0;
            text-align: center;
        }
    }

    #banner-div {
        display: flex;
        justify-content: center;
    }

    #navigation-div {
        display: flex;
        justify-content: space-evenly;
        padding: 25px 0 0 0;
        button {
            width: 300px;
            height: 30px;
            cursor: pointer;
            font-weight: bold;
            background-color: white;
            border: 3px solid #4484CE;
            border-radius: 10px;
        }
    }

    #static-meals-div {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        img {
            width: 306px;
            height: 462.6px;
        }
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
            <div id='static-meals-div'>
                <p>Track your meals' nutritional facts.</p>
                <img src={MealsImg} alt='Meals' />
                <p>Live a healthier lifestyle.</p>
            </div>
        </AuthHomeContainer>
    )
}
export default AuthHome;