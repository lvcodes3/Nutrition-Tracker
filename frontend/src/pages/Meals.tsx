// dependencies //
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import styled from 'styled-components';
// context //
import { AuthContext } from '../context/AuthContext';
//
import { FaCircleXmark, FaStarOfLife } from 'react-icons/fa6';

// set the app root element //
Modal.setAppElement('#root');

const Container = styled.div`
    border: 1px solid red;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #D9D9D9;

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
    interface FormDataErrorTypes {
        nameError: string;
        caloriesError: string;
        totalFatError: string;
        cholesterolError: string;
        sodiumError: string;
        totalCarbohydrateError: string;
        proteinError: string;
        timestampError: string;
    };
    const [formDataErrors, setFormDataErrors] = useState<FormDataErrorTypes>({
        nameError: '',
        caloriesError: '',
        totalFatError: '',
        cholesterolError: '',
        sodiumError: '',
        totalCarbohydrateError: '',
        proteinError: '',
        timestampError: ''
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

    const isIntegerString = (str: string) => {
        return /^\d+$/.test(str);
    }

    const validateFormData = () => {
        // trim inputs //
        setFormData({
            name: formData.name.trim(),
            calories: formData.calories.trim(),
            totalFat: formData.totalFat.trim(),
            cholesterol: formData.cholesterol.trim(),
            sodium: formData.sodium.trim(),
            totalCarbohydrate: formData.totalCarbohydrate.trim(),
            protein: formData.protein.trim(),
            timestamp: formData.timestamp.trim()
        });

        let errorCount: number = 0;
        let updatedFormDataErrors = { ...formDataErrors };

        if (formData.name.length === 0) {
            updatedFormDataErrors.nameError = 'Name is required.';
            errorCount++;
        }
        else if (formData.name.length > 50) {
            updatedFormDataErrors.nameError = 'Name can only be up to 50 characters in length.';
            errorCount++;
        }

        if (formData.calories.length > 0) {
            if (!isIntegerString(formData.calories)) {
                updatedFormDataErrors.caloriesError = 'Calories must only be integers.';
                errorCount++;
            }
            else if (parseInt(formData.calories) < 0) {
                updatedFormDataErrors.caloriesError = 'Calories can not be negative.';
                errorCount++;
            }
        }

        if (formData.timestamp.length === 0) {
            updatedFormDataErrors.timestampError = 'Date & Time Consumed is required.';
            errorCount++;
        }

        setFormDataErrors(updatedFormDataErrors);

        return errorCount === 0;
    }

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        // prevent screen refresh //
        e.preventDefault();

        if (validateFormData()) {
            // determine api endpoint //
            if (selectedMeal === 'Breakfast') {

            }
            else if (selectedMeal === 'Lunch') {

            }
            else if (selectedMeal === 'Dinner') {

            }
            else if (selectedMeal === 'Snack') {

            }
        }
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
                    <StyledFaCircleXmark onClick={closeModal}/>
                    <h1>{selectedMeal}</h1>

                    <form onSubmit={submitForm}>
                        <div>
                            <p>{formDataErrors.nameError}</p>
                            <label>Name: <StyledFaStarOfLife /></label>
                            <input
                                type='text'
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
                            <p>{formDataErrors.caloriesError}</p>
                            <label>Calories:</label>
                            <input
                                type='number'
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
                                type='number'
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
                                type='number'
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
                                type='number'
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
                                type='number'
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
                                type='number'
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
                            <p>{formDataErrors.timestampError}</p>
                            <label>Date & Time Consumed: <StyledFaStarOfLife /></label>
                            <input
                                type='datetime-local'
                                value={formData.timestamp}
                                onChange={(e) => {
                                    setFormData((prevFormData) => ({
                                        ...prevFormData,
                                        timestamp: e.target.value
                                    }));
                                }}
                            />
                        </div>

                        <button type='submit'>Enter</button>
                    </form>
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
        width: 450px;
        height: 550px;
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
                p {
                    margin: 0;
                    color: red;
                }
                label {
                    text-align: left;
                    font-weight: bold;
                }
                input {
                    border: 1px solid black;
                    border-radius: 10px;
                }
            }
            
            button {
                margin: 0 auto;
                width: 225px;
                font-weight: bold;
                border: 1px solid black;
                border-radius: 10px;
                background-color: white;
            }
        }
    }
`;
const StyledFaCircleXmark = styled(FaCircleXmark)`
    color: red;
    font-size: 20px;
    float: right;
    cursor: pointer;
`;
const StyledFaStarOfLife = styled(FaStarOfLife)`
    color: red;
    font-size: 12px;
`;