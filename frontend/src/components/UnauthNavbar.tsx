// dependencies //
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const UnauthNavbarContainer = styled.nav`
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    color: white;
    background-color: #4484CE;

    #header-div {
        flex: 70%;
        #header-link {
            margin: 0;
            padding-left: 10%;
            color: white;
            font-size: 22px;
            font-weight: bold;
            text-decoration: none;
        }
    }
    .register-login-div {
        flex: 15%;
        .register-login-link {
            margin: 0;
            display: flex;
            justify-content: center;
            color: white;
            font-size: 20px;
            font-weight: bold;
            text-decoration: none;
        }
    }
`;

const UnauthNavbar = () => {
    return (
        <UnauthNavbarContainer>
            <div id='header-div'>
                <Link id='header-link' to='/'>Nutrition Tracker</Link>
            </div>
            <div className='register-login-div'>
                <Link className='register-login-link' to='/register'>Register</Link>
            </div>
            <div className='register-login-div'>
                <Link className='register-login-link' to='/login'>Login</Link>
            </div>
        </UnauthNavbarContainer>
    );
}
export default UnauthNavbar;