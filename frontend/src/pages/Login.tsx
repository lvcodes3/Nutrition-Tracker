// dependencies //
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
// context //
import { AuthContext } from '../context/AuthContext';

const Container = styled.div`
    width: 100%;
    height: calc(100vh - 100px);
    display: flex;
    justify-content: center;
    background-color: #D9D9D9;
`;
const LoginForm = styled.form`
    width: 500px;
    height: 275px;
    margin: 50px 0 0 0;
    border: 2px solid black;
    border-radius: 10px;
    background-color: #88BBD6;

    h1 {
        margin: 0 0 5px 0;
        text-align: center;
        font-weight: bold;
    }

    label {
        margin: 0 0 5px 10px;
        display: block;
        font-weight: bold;
    }
    input {
        width: 90%;
        margin: 0 0 25px 10px;
        padding: 5px;
        border: 1px solid black;
        border-radius: 10px;
    }

    div {
        display: flex;
        justify-content: center;

        button {
            width: 50%;
            padding: 5px;
            margin: 10px 0 0 0;
            cursor: pointer;
            font-weight: bold;
            border: 1px solid black;
            border-radius: 10px;
        }
    }
`;

const Login = () => {
    const { consumer, setConsumer } = useContext(AuthContext);

    const navigate = useNavigate();

    interface FormDataTypes {
        email: string;
        password: string;
    };
    const [formData, setFormData] = useState<FormDataTypes>({
        email: '',
        password: ''
    });

    useEffect(() => {
        if (consumer.authenticated) {
            navigate('/');
        }
    }, [consumer.authenticated, navigate]);

    const validateFormData = () => {
        let errorCount: number = 0;
        if (formData.email.length === 0) {
            toast.error('Your email is required!');
            errorCount++;
        }
        if (formData.password.length === 0) {
            toast.error('Your password is required!');
            errorCount++;
        }
        return (errorCount === 0 ? true : false);
    }

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        // prevent screen refresh //
        e.preventDefault();

        if (validateFormData()) {
            try {
                const response = await fetch(
                    'http://localhost:5000/api/v1/consumer/login',
                    {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    }
                );    
    
                if (response.ok) {
                    const loggedInConsumer = await response.json();
                    setConsumer({
                        ...loggedInConsumer,
                        authenticated: true
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
                toast.error('An error occurred, please try again.');
            }
        }
    }

    return (
        <Container>
            <LoginForm onSubmit={submitForm}>
                <h1>Login</h1>

                <label htmlFor='email'>Email:</label>
                <input 
                    id='email'
                    type='email'
                    autoComplete='off'
                    value={formData.email}
                    onChange={(e) => {
                        setFormData((prevFormData) => ({
                            ...prevFormData,
                            email: e.target.value
                        }));
                    }}
                />

                <label htmlFor='password'>Password:</label>
                <input 
                    id='password'
                    type='password'
                    autoComplete='off'
                    value={formData.password}
                    onChange={(e) => {
                        setFormData((prevFormData) => ({
                            ...prevFormData,
                            password: e.target.value
                        }));
                    }}
                />

                <div>
                    <button type='submit'>Login</button>
                </div>
            </LoginForm>
        </Container>
    );
}
export default Login;