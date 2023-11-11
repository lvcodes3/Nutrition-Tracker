// dependencies //
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
// context //
import { AuthContext } from '../context/AuthContext';
// assets //
import { FaPerson, FaPowerOff } from 'react-icons/fa6';

const AuthNavbarContainer = styled.nav`
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    color: white;
    background-color: #4484CE;

    #header-div {
        flex: 50%;
        #header-link {
            margin: 0;
            padding-left: 10%;
            color: white;
            font-size: 22px;
            font-weight: bold;
            text-decoration: none;
        }
    }
    #meals-div {
        flex: 35%;
        text-align: center;
        #meals-link {
            margin: 0;
            color: white;
            font-size: 20px;
            font-weight: bold;
            text-decoration: none;
        }
    }
    #profile-div {
        flex: 15%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
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
    let navigate = useNavigate();
    
    const { user, setUser } = useContext(AuthContext);

    const logout = async () => {
        try {
            const response = await fetch(
                'http://localhost:5000/api/v1/user/logout',
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
                setUser({
                    id: null,
                    firstName: null,
                    email: null,
                    createdAt: null,
                    updatedAt: null,
                    lastSignedIn: null,
                    authenticated: false
                });
                navigate('/');
            } else {
                const error = await response.json();
                toast.error(error.err);
            }
        } catch (err) {
            console.log(`Error: ${err}`);
            toast.error('Error logging out.');
        }
    }

    return (
        <>
        {
            user.authenticated ? (
                <AuthNavbarContainer>
                    <div id='header-div'>
                        <Link id='header-link' to='/'>Nutrition Tracker</Link>
                    </div>
                    <div id='meals-div'>
                        <Link id='meals-link' to='/meals'>My Meals</Link>
                    </div>
                    <div id='profile-div'>
                        <Link id='profile-link' to='/profile'>{user.firstName}</Link>
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
    )
}
export default Navbar;