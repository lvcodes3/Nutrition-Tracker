// dependencies //
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// context //
import { AuthContext } from '../context/AuthContext';
// assets //

const ProfileContainer = styled.div`
    width: 100%;
    height: calc(100vh - 100px);

    h1 {
        margin: 0;
        padding: 10px 0 10px 0;
        text-align: center;
    }
    
    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }

    th, td {
        border: 1px solid #dddddd;
        text-align: center;
        padding: 8px;
    }

    th {
        background-color: #f2f2f2;
    }

    td.today {
        background-color: #4CAF50;
        color: white;
    }
`;


const Profile = () => {
    const  { consumer, setConsumer } = useContext(AuthContext);

    const navigate = useNavigate();

    const [calendar, setCalendar] = useState<(string | number | { day: number; today: boolean; })[][]>([]);

    useEffect(() => {
        generateCalender();
    }, []);

    const generateCalender = () => {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        const matrix = [];
        let day = 1;

        for (let i = 0; i < 6; i++) {
            const week = [];
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < new Date(currentYear, currentMonth, 1).getDay()) {
                    week.push('');
                } else if (day <= daysInMonth) {
                    week.push(day);

                    // Highlight the current day
                    if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
                        week[week.length - 1] = { day, today: true };
                    }

                    day++;
                } else {
                    week.push('');
                }
            }
            matrix.push(week);
        }

        setCalendar(matrix);
    }

    return (
        <ProfileContainer>
            <h1>{consumer.firstName}</h1>
            <table>
                <thead>
                    <tr>
                        <th scope='col'>Sunday</th>
                        <th scope='col'>Monday</th>
                        <th scope='col'>Tuesday</th>
                        <th scope='col'>Wednesday</th>
                        <th scope='col'>Thursday</th>
                        <th scope='col'>Friday</th>
                        <th scope='col'>Saturday</th>
                    </tr>
                </thead>
                <tbody>
                    {calendar.map((week, rowIndex) => (
                        <tr key={rowIndex}>
                            {week.map((day, columnIndex) => (
                                <td key={columnIndex} className={day && typeof day === 'object' && day.today ? 'today' : ''}>
                                    {day && typeof day === 'object' ? day.day : day}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </ProfileContainer>
    );
}
export default Profile;