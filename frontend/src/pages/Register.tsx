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
const RegisterForm = styled.form`
    width: 500px;
    height: 425px;
    margin: 50px 0 50px 0;
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
            background-color: white;
        }
    }
`;

const Register = () => {
    let navigate = useNavigate();

    const { user, setUser } = useContext(AuthContext);

    interface FormDataTypes {
        firstName: string;
        email: string;
        password: string;
        passwordConfirmation: string;
    };
    const [formData, setFormData] = useState<FormDataTypes>({
        firstName: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    });

    useEffect(() => {
        if (user.authenticated) {
            navigate('/');
        }
    }, [navigate, user.authenticated]);

    const validateFormData = () => {
        setFormData({
            firstName: formData.firstName.trim(),
            email: formData.email.trim(),
            password: formData.password.trim(),
            passwordConfirmation: formData.passwordConfirmation.trim()
        });

        let errorCount: number = 0;
        if (formData.firstName.length === 0 || formData.firstName.length > 25) {
            toast.error('First name is required and can only be up to 25 characters in length.');
            errorCount++;
        }
        if (formData.email.length === 0 || formData.email.length > 50) {
            toast.error('Email is required and can only be up to 50 characters in length.');
            errorCount++;
        }
        if (formData.password.length < 5 || formData.password.length > 20) {
            toast.error('Password is required and must be between 5 and 20 characters in length.');
            errorCount++;
        }
        if (formData.password !== formData.passwordConfirmation) {
            toast.error('Password and Password Confirmation must match.');
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
                    'http://localhost:5000/api/v1/user/register',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    }
                );    
    
                if (response.ok) {
                    toast.success('You have successfully registered, please login.');
                    navigate('/login');
                } else {
                    const error = await response.json();
                    toast.error(error.err);
                }
            } catch (err) {
                console.log(`Error: ${err}`);
                toast.error('An error occurred, please try again.');
            }
        }
    }

    return (
        <Container>
            <RegisterForm onSubmit={submitForm}>
                <h1>Register</h1>

                <label htmlFor='firstName'>First Name:</label>
                <input 
                    id='firstName'
                    type='text'
                    autoComplete='off'
                    value={formData.firstName}
                    onChange={(e) => {
                        setFormData((prevFormData) => ({
                            ...prevFormData,
                            firstName: e.target.value
                        }));
                    }}
                />

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

                <label htmlFor='passwordConfirmation'>Password Confirmation:</label>
                <input 
                    id='passwordConfirmation'
                    type='password'
                    autoComplete='off'
                    value={formData.passwordConfirmation}
                    onChange={(e) => {
                        setFormData((prevFormData) => ({
                            ...prevFormData,
                            passwordConfirmation: e.target.value
                        }));
                    }}
                />

                <div>
                    <button type='submit'>Register</button>
                </div>
            </RegisterForm>
        </Container>
    );
}
export default Register;