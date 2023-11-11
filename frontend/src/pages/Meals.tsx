// dependencies //
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// context //
import { AuthContext } from '../context/AuthContext';

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
        <div>
            <div>
                <h1>{date}</h1>
            </div>
        </div>
    );
}
export default Meals;