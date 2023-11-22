// dependencies //
import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
// context //
import { AuthContext } from '../context/AuthContext';
// assets //
import { FaMagnifyingGlass, FaPersonCirclePlus, FaPersonCircleExclamation, FaPersonCircleXmark, FaPersonCircleCheck } from 'react-icons/fa6';

const SearchContainer = styled.div`
    width: 100%;
    min-height: calc(100vh - 100px);
    background-color: #D9D9D9;
    h1 {
        margin: 0;
        padding: 10px 0 10px 0;
        text-align: center;
    }
`;
const SearchForm = styled.form`
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
        button {
            width: 100%;
            height: 100%;
            border: none;
            cursor: pointer;
        }
    }
`;
const StyledFaPersonCirclePlus = styled(FaPersonCirclePlus)`
    font-size: 18px;
    color: #4CAF50;
`;
const StyledFaPersonCircleExclamation = styled(FaPersonCircleExclamation)`
    font-size: 18px;
    color: orange;
`;
const StyledFaPersonCircleXmark = styled(FaPersonCircleXmark)`
    font-size: 18px;
    color: red;
`;
const StyledFaPersonCircleCheck = styled(FaPersonCircleCheck)`
    font-size: 18px;
`;

const Search = () => {
    const { consumer, setConsumer } = useContext(AuthContext);

    const [formFirstName, setFormFirstName] = useState<string>('');

    interface ConsumersType {
        id: number;
        firstName: string;
        relationshipStatus: string;
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
                'http://localhost:5000/api/v1/consumer/sendFriendRequest',
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ receiverId: id})
                }
            );    

            if (response.ok) {
                const resp = await response.json();
                console.log(resp);
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
        <SearchContainer>
            <h1>Search</h1>
            <SearchForm onSubmit={search} autoComplete='off'>
                <input
                    type='text'
                    value={formFirstName}
                    onChange={(e) => {
                        setFormFirstName(e.target.value)
                    }}
                />
                <button type='submit'><StyledFaMagnifyingGlass /></button>
            </SearchForm>
            {
                consumers && (
                    <ResultsTable>
                            <tbody>
                                {
                                    consumers.map((consumer) => {
                                        return (
                                            <tr key={consumer.id}>
                                                <td className='td1'>{consumer.firstName}</td>
                                                {
                                                    consumer.relationshipStatus === 'null' ? (
                                                        <td className='td2'>
                                                            <button onClick={() => sendFriendRequest(consumer.id)}>
                                                                <StyledFaPersonCirclePlus />
                                                            </button>
                                                        </td>
                                                    ) : consumer.relationshipStatus === 'pending' ? (
                                                        <td className='td2'>
                                                            <button>
                                                                <StyledFaPersonCircleExclamation />
                                                            </button>
                                                        </td>
                                                    ) : consumer.relationshipStatus === 'accepted' ? (
                                                        <td className='td2'>
                                                            <button>
                                                                <StyledFaPersonCircleXmark />
                                                            </button>
                                                        </td>
                                                    ) : (
                                                        <td className='td2'>
                                                            <button>
                                                                <StyledFaPersonCircleCheck />
                                                            </button>
                                                        </td>
                                                    )
                                                }
                                                
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                    </ResultsTable>
                )
            }
        </SearchContainer>
    );
}
export default Search;