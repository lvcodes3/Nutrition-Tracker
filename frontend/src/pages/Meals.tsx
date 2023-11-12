// dependencies //
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// context //
import { AuthContext } from '../context/AuthContext';

const Container = styled.div`
    border: 1px solid red;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    #meals-header-div {
        border: 1px solid blue;
        h1 {
            margin: 10px 0 10px 0;
            text-align: center;
        }
    }

    #breakfasts-div {
        border: 1px solid green;
        h1 {
            margin: 5px 0 5px 0;
            text-align: center;
        }
    }
    #lunches-div {
        border: 1px solid green;
        h1 {
            margin: 5px 0 5px 0;
            text-align: center;
        }
    }
    #dinners-div {
        border: 1px solid green;
        h1 {
            margin: 5px 0 5px 0;
            text-align: center;
        }
    }
    #snacks-div {
        border: 1px solid green;
        h1 {
            margin: 5px 0 5px 0;
            text-align: center;
        }
    }
`;

const Meals = () => {
    const { user, setUser } = useContext(AuthContext);

    const [date, setDate] = useState<null | string>(null);
    const [time, setTime] = useState<null | string>(null);

    const getDateTime = () => {
        const currentDate = new Date().toLocaleString();
        const arr = currentDate.split(', ');
        setDate(arr[0]);
        setTime(arr[1]);
    }

    useEffect(() => {
        getDateTime();
    }, []);

    return (
        <Container>
            <div id='meals-header-div'>
                <h1>{date}</h1>
            </div>
            <div id='breakfasts-div'>
                <h1>Breakfasts</h1>
            </div>
            <div id='lunches-div'>
                <h1>Lunches</h1>
            </div>
            <div id='dinners-div'>
                <h1>Dinners</h1>
            </div>
            <div id='snacks-div'>
                <h1>Snacks</h1>
            </div>
        </Container>
    );
}
export default Meals;