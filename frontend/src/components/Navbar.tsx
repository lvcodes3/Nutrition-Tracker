// dependencies //
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
// context //
import { AuthContext } from '../context/AuthContext';
// assets //
import { FaPowerOff } from 'react-icons/fa6';

const AuthNavbarContainer = styled.nav`
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    color: white;
    background-color: #4484CE;

    #header-div {
        flex: 80%;

        #header-link {
            margin: 0;
            padding-left: 10%;
            color: white;
            font-size: 22px;
            font-weight: bold;
            text-decoration: none;
        }
    }

    #profile-div {
        flex: 20%;
        display: flex;
        justify-content: right;
        gap: 10%;

        #profile-link {
            color: white;
            font-size: 20px;
            font-weight: bold;
            text-decoration: none;
        }

        button {
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #FF3B3F;
            border: 1px solid white;
            border-radius: 10px;
            margin-right: 5%;

            #styled-fa-power-off {
                color: white;
                font-size: 16px;
                font-weight: bold;
            }
        }
    }
`;

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

const Navbar = () => {
    const { consumer, setConsumer } = useContext(AuthContext);

    const navigate = useNavigate();

    const logout = async () => {
        try {
            const response = await fetch(
                'http://localhost:5000/api/v1/consumer/logout',
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.ok) {
                const msg = await response.json();
                toast.success(msg.msg);
                setConsumer({
                    id: null,
                    firstName: null,
                    email: null,
                    createdAt: null,
                    updatedAt: null,
                    lastSignedIn: null,
                    authenticated: false
                });
                navigate('/');
            } 
            else {
                const error = await response.json();
                toast.error(error.err);
            }
        } 
        catch (err) {
            console.log(`Error: ${err}`);
            toast.error('Error logging out.');
        }
    }

    return (
        <>
        {
            consumer.authenticated ? (
                <AuthNavbarContainer>
                    <div id='header-div'>
                        <Link id='header-link' to='/'>Nutrition Tracker</Link>
                    </div>
                    <div id='profile-div'>
                        <Link id='profile-link' to='/profile'>{consumer.firstName}</Link>
                        <button onClick={logout}>
                            <FaPowerOff id='styled-fa-power-off' />
                        </button>
                    </div>
                </AuthNavbarContainer>
            ) : (
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
            )
        }
        </>
    );
}
export default Navbar;