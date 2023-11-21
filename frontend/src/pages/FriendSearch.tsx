// dependencies //
import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
// context //
import { AuthContext } from '../context/AuthContext';
// assets //
import { FaMagnifyingGlass } from 'react-icons/fa6';

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
    width: 80%;
    display: flex;
    align-items: stretch;
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
const ResultsContainer = styled.div`
    width: 80%;
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

    }

    return (
        <FriendSearchContainer>
            <h1>Friend Search</h1>
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
                    <ResultsContainer>
                        <table>
                            <tbody>
                                {
                                    consumers.map((consumer) => {
                                        return (
                                            <tr>
                                                <td>{consumer.firstName}</td>
                                                <td><button onClick={() => sendFriendRequest(consumer.id)}></button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </ResultsContainer>
                )
            }
        </FriendSearchContainer>
    );
}
export default FriendSearch;