// dependencies //
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// context //
import { AuthContext } from '../context/AuthContext';

const UnauthHomeContainer = styled.div`
width: 100%;
height: auto;
background-color: #D9D9D9;
`;

const UnauthHome = () => {
    const { user, setUser } = useContext(AuthContext);

    const navigate = useNavigate();

    return (
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
    );
}
export default UnauthHome;