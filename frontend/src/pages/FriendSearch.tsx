// dependencies //
import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
// context //
import { AuthContext } from '../context/AuthContext';
// assets //
import { FaMagnifyingGlass, FaUserPlus, FaUserPen } from 'react-icons/fa6';

const FriendSearchContainer = styled.div`
    width: 100%;
    min-height: calc(100vh - 100px);
    background-color: #D9D9D9;
    h1 {
        margin: 0;
        padding: 10px 0 10px 0;
        text-align: center;
    }
`;
const FriendSearchForm = styled.form`
    margin: 0 auto;
    width: 70%;
    display: flex;
    align-items: stretch;
    padding: 10px 0 20px 0;
    input {
        flex: 9;
        height: 25px;
        border: 3px solid #4484CE;
    }
    button {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        border-top: 3px solid #4484CE;
        border-right: 3px solid #4484CE;
        border-bottom: 3px solid #4484CE;
        border-left: none;
        cursor: pointer;
    }
`;
const StyledFaMagnifyingGlass = styled(FaMagnifyingGlass)`
    color: #4484CE;    
    font-size: 18px;
`;
const ResultsTable = styled.table`
    margin: 0 auto;
    width: 70%;
    border: 1px solid black;
    border-collapse: collapse;
    text-align: center;
    background-color: white;
    .td1 {
        width: 85%;
        font-weight: bold;
        border: 1px solid black;
    }
    .td2 {
        width: 15%;
        border: 1px solid black;
        background-color: #4CAF50;
        cursor: pointer;
        font-size: 18px;
    }
`;
const StyledFaUserPlus = styled(FaUserPlus)`

`;
const StyledFaUserPen = styled(FaUserPen)`

`;

const FriendSearch = () => {
    const { consumer, setConsumer } = useContext(AuthContext);

    const [formFirstName, setFormFirstName] = useState<string>('');

    interface ConsumersType {
        id: number;
        firstName: string;
    };
    const [consumers, setConsumers] = useState<null | ConsumersType[]>(null);

    const validateName = () => {
        setFormFirstName(formFirstName.trim());

        if (formFirstName === '') {
            toast.error('Name is required.');
            return false;
        }
        else if (formFirstName.length > 25) {
            toast.error('Name can not be over 25 characters in length.');
            return false;
        }

        return true;
    }

    const search = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateName()) {
            try {
                const response = await fetch(
                    'http://localhost:5000/api/v1/consumer/searchByFirstName',
                    {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ firstName: formFirstName })
                    }
                );    
    
                if (response.ok) {
                    const consumersArr = await response.json();
                    console.log(consumersArr);
                    setConsumers(consumersArr);
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

    const sendFriendRequest = async (id: number) => {
        try {
            const response = await fetch(
                'http://localhost:5000/api/v1/consumer/searchByFirstName',
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ firstName: formFirstName })
                }
            );    

            if (response.ok) {
                const consumersArr = await response.json();
                console.log(consumersArr);
                setConsumers(consumersArr);
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

    return (
        <FriendSearchContainer>
            <h1>Search for a Friend</h1>
            <FriendSearchForm onSubmit={search} autoComplete='off'>
                <input
                    type='text'
                    value={formFirstName}
                    onChange={(e) => {
                        setFormFirstName(e.target.value)
                    }}
                />
                <button type='submit'><StyledFaMagnifyingGlass /></button>
            </FriendSearchForm>
            {
                consumers && (
                    <ResultsTable>
                            <tbody>
                                {
                                    consumers.map((consumer) => {
                                        return (
                                            <tr key={consumer.id}>
                                                <td className='td1'>{consumer.firstName}</td>
                                                <td className='td2' onClick={() => sendFriendRequest(consumer.id)}><StyledFaUserPlus /></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                    </ResultsTable>
                )
            }
        </FriendSearchContainer>
    );
}
export default FriendSearch;