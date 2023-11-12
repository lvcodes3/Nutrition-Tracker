// dependencies //
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import styled from 'styled-components';
// context //
import { AuthContext } from '../context/AuthContext';

// set the app root element //
Modal.setAppElement('#root');

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
        text-align: center;

        h1 {
            margin: 5px 0 5px 0;
            text-align: center;
        }
        div {

        }
        button {
            
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

    const [selectedMeal, setSelectedMeal] = useState<null | string>(null);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    interface FormDataTypes {
        name: string;
        calories: string;
        totalFat: string;
        cholesterol: string;
        sodium: string;
        totalCarbohydrate: string;
        protein: string;
        timestamp: string;
    };
    const [formData, setFormData] = useState<FormDataTypes>({
        name: '',
        calories: '',
        totalFat: '',
        cholesterol: '',
        sodium: '',
        totalCarbohydrate: '',
        protein: '',
        timestamp: ''
    });

    useEffect(() => {
        const getDateTime = () => {
            const currentDate = new Date().toLocaleString();
            const arr = currentDate.split(', ');
            setDate(arr[0]);
            setTime(arr[1]);
        }
        getDateTime();
    }, []);

    const openModal = () => {
        setModalIsOpen(true);
    }
    const closeModal = () => {
        setModalIsOpen(false);
    }
    const setSelectedMealAndOpenModal = (meal:string) => {
        setSelectedMeal(meal);
        openModal();
    }

    const submitForm = () => {

    }

    return (
        <Container>
            <div id='meals-header-div'>
                <h1>{date}</h1>
            </div>
            <div id='breakfasts-div'>
                <h1>Breakfasts</h1>
                <div>
                    <p>Empty</p>
                </div>
                <button onClick={() => {
                    setSelectedMealAndOpenModal('Breakfast')
                }}>
                    Add Breakfast
                </button>
            </div>
            <div id='lunches-div'>
                <h1>Lunches</h1>
                <div>
                    <p>Empty</p>
                </div>
                <button onClick={() => {
                    setSelectedMealAndOpenModal('Lunch')
                }}>
                    Add Lunch
                </button>
            </div>
            <div id='dinners-div'>
                <h1>Dinners</h1>
                <div>
                    <p>Empty</p>
                </div>
                <button onClick={() => {
                    setSelectedMealAndOpenModal('Dinner')
                }}>
                    Add Dinner
                </button>
            </div>
            <div id='snacks-div'>
                <h1>Snacks</h1>
                <div>
                    <p>Empty</p>
                </div>
                <button onClick={() => {
                    setSelectedMealAndOpenModal('Snack')
                }}>
                    Add Snack
                </button>
            </div>

            <CustomModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel='Modal'
            >
                <div id='content-modal-div'>
                    <h1>{selectedMeal}</h1>

                    <form onSubmit={submitForm}>
                        <div>
                            <label>Name:</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => {
                                    setFormData((prevFormData) => ({
                                        ...prevFormData,
                                        name: e.target.value
                                    }));
                                }}
                            />
                        </div>

                        <div>
                            <label>Calories:</label>
                            <input
                                type="number"
                                value={formData.calories}
                                onChange={(e) => {
                                    setFormData((prevFormData) => ({
                                        ...prevFormData,
                                        calories: e.target.value
                                    }));
                                }}
                            />
                        </div>

                        <div>
                            <label>Total Fat:</label>
                            <input
                                type="text"
                                value={formData.totalFat}
                                onChange={(e) => {
                                    setFormData((prevFormData) => ({
                                        ...prevFormData,
                                        totalFat: e.target.value
                                    }));
                                }}
                            />
                        </div>

                        <div>
                            <label>Cholesterol:</label>
                            <input
                                type="text"
                                value={formData.cholesterol}
                                onChange={(e) => {
                                    setFormData((prevFormData) => ({
                                        ...prevFormData,
                                        cholesterol: e.target.value
                                    }));
                                }}
                            />
                        </div>

                        <div>
                            <label>Sodium:</label>
                            <input
                                type="text"
                                value={formData.sodium}
                                onChange={(e) => {
                                    setFormData((prevFormData) => ({
                                        ...prevFormData,
                                        sodium: e.target.value
                                    }));
                                }}
                            />
                        </div>
                        
                        <div>
                            <label>Total Carbohydrate:</label>
                            <input
                                type="text"
                                value={formData.totalCarbohydrate}
                                onChange={(e) => {
                                    setFormData((prevFormData) => ({
                                        ...prevFormData,
                                        totalCarbohydrate: e.target.value
                                    }));
                                }}
                            />
                        </div>

                        <div>
                            <label>Protein:</label>
                            <input
                                type="text"
                                value={formData.protein}
                                onChange={(e) => {
                                    setFormData((prevFormData) => ({
                                        ...prevFormData,
                                        protein: e.target.value
                                    }));
                                }}
                            />
                        </div>

                        <div>
                            <label>Date Time Consumed:</label>
                            <input
                                type="datetime-local"
                                value={formData.timestamp}
                                onChange={(e) => {
                                    setFormData((prevFormData) => ({
                                        ...prevFormData,
                                        timestamp: e.target.value
                                    }));
                                }}
                            />
                        </div>

                        <button type="submit">Enter</button>
                    </form>

                    <div>
                        <button onClick={closeModal}>Exit</button>
                    </div>
                </div>
            </CustomModal>
        </Container>
    );
}
export default Meals;

const CustomModal = styled(Modal)`
    overlay {
        /* styles for the overlay */
        background-color: rgba(0, 0, 0, 0.5);
        /* ... add more overlay styles as needed */
    }

    #content-modal-div {
        width: 40%;
        height: 500px;
        padding: 20px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        text-align: center;
        border: 1px solid black;

        h1 {
            margin: 10px 0 10px 0;
            text-align: center;
        }

        form {
            display: flex;
            flex-direction: column;
            gap: 20px;

            div {
                display: flex;
                flex-direction: column;
                label {
                    text-align: left;
                }
            }
            

        }
    }
`;