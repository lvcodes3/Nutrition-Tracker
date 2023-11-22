// dependencies //
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// context //
import { AuthContext } from '../context/AuthContext';
// assets //

const ProfileContainer = styled.div`
    width: 100%;
    min-height: calc(100vh - 100px);
    background-color: #D9D9D9;

    #profile-header-div {
        position: relative;
        text-align: center;
        h1 {
            display: inline-block;
            margin: 0;
            padding: 10px 0 10px 0;
        }
        button {
            position: absolute;
            top: 50%;
            right: 2%;
            transform: translateY(-50%);
            width: 200px;
            height: 30px;
            cursor: pointer;
            font-weight: bold;
            background-color: white;
            border: 3px solid #4484CE;
            border-radius: 10px;
        }
    }

    h2 {
        margin: 0 auto;
        width: 90%;
    }
    
    table {
        margin: 0 auto;
        margin-top: 20px;
        width: 90%;
        border: 1px solid black;
        border-collapse: collapse;
        text-align: center;

        th {
            width: 14.29%;
            background-color: #88BBD6;
            padding: 5px;
            border: 1px solid black;
        }
        td {
            width: 14.29%;
            background-color: white;
            padding: 5px;
            border: 1px solid black;
            cursor: pointer;
        }
        td.today {
            color: white;
            background-color: #4CAF50;
        }
    }
`;

interface ProfileProps {
    displayDate: null | string;
    setDisplayDate: (newDisplayDate: string) => void;
    queryDate: null | string;
    setQueryDate: (newQueryDate: string) => void;
};

const Profile: React.FC<ProfileProps> = ({ displayDate, setDisplayDate, queryDate, setQueryDate }) => {
    const  { consumer, setConsumer } = useContext(AuthContext);

    const navigate = useNavigate();

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const [calendar, setCalendar] = useState<(string | number | { day: number; today: boolean; })[][]>([]);

    useEffect(() => {
        generateCalender();
    }, []);

    const generateCalender = () => {
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

                    // highlight the current day //
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

    const handleDayClick = (day: number) => {
        setDisplayDate(`${currentMonth + 1}/${day}/${currentYear}`);
        setQueryDate(`${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);
        navigate('/meals');
    }

    return (
        <ProfileContainer>
            <div id='profile-header-div'>     
                <h1>{consumer.firstName}</h1>
                <button onClick={() => {
                    navigate('/friendSearch');
                }}>Search</button>  
            </div>
            <h2>Month Name</h2>
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
                                <td 
                                    key={columnIndex} 
                                    className={day && typeof day === 'object' && day.today ? 'today' : ''}
                                    onClick={() => {
                                        handleDayClick(day as number);
                                    }}
                                >
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