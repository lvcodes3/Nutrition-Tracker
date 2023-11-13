// dependencies //
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import styled from 'styled-components';
// context //
import { AuthContext } from '../context/AuthContext';
// assets //
import { FaCircleXmark, FaStarOfLife } from 'react-icons/fa6';

// set the app root element //
Modal.setAppElement('#root');

const Container = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    background-color: #D9D9D9;

    #date-div {
        border: 1px solid blue;
        h1 {
            margin: 10px 0 10px 0;
            text-align: center;
        }
    }

    .meals-div {
        padding: 10px;
        border: 1px solid green;
        text-align: center;

        h1 {
            margin: 0 0 5px 0;
            text-align: center;
        }
        div {

        }
        button {
            
        }
    }
`;

const Meals = () => {
    const { user, setUser } = useContext(AuthContext);

    const [displayDate, setDisplayDate] = useState<null | string>(null);
    const [queryDate, setQueryDate] = useState<null | string>(null);
    const [selectedMeal, setSelectedMeal] = useState<null | string>(null);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    interface MealDataTypes {
        id: number;
        userId: number;
        name: string;
        calories: null | number;
        totalFat: null | number;
        cholesterol: null | number;
        sodium: null | number;
        totalCarbohydrate: null | number;
        protein: null | number;
        consumedAt: string;
        createdAt: string;
        updatedAt: null | string;
    }
    const [breakfasts, setBreakfasts] = useState<MealDataTypes[]>([]);
    const [lunches, setLunches] = useState<MealDataTypes[]>([]);
    const [dinners, setDinners] = useState<MealDataTypes[]>([]);
    const [snacks, setSnacks] = useState<MealDataTypes[]>([]);

    interface FormDataTypes {
        name: string;
        calories: string;
        totalFat: string;
        cholesterol: string;
        sodium: string;
        totalCarbohydrate: string;
        protein: string;
        consumedAt: string;
    };
    const [formData, setFormData] = useState<FormDataTypes>({
        name: '',
        calories: '',
        totalFat: '',
        cholesterol: '',
        sodium: '',
        totalCarbohydrate: '',
        protein: '',
        consumedAt: ''
    });

    interface FormDataErrorTypes {
        nameError: string;
        caloriesError: string;
        totalFatError: string;
        cholesterolError: string;
        sodiumError: string;
        totalCarbohydrateError: string;
        proteinError: string;
        consumedAtError: string;
    };
    const [formDataErrors, setFormDataErrors] = useState<FormDataErrorTypes>({
        nameError: '',
        caloriesError: '',
        totalFatError: '',
        cholesterolError: '',
        sodiumError: '',
        totalCarbohydrateError: '',
        proteinError: '',
        consumedAtError: ''
    });

    useEffect(() => {
        const getDailyMeals = async (date: string) => {
            try {
                const response = await fetch(
                  'http://localhost:5000/api/v1/nutrition/getDailyMeals',
                  {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ date: date })
                  }
                );
                console.log(response);
                if (response.ok) {
                  const data = await response.json();
                  console.log(data);
                }
              } catch (err) {
                console.log(`Fetch error: ${err}`);
              }
        }

        const getCurrentDate = () => {
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const currentDay = currentDate.getDate();
            const currentYear = currentDate.getFullYear();
            setDisplayDate(`${currentMonth}/${currentDay}/${currentYear}`);
            setQueryDate(`${currentYear}-${currentMonth}-${currentDay}`);

            getDailyMeals(`${currentYear}-${currentMonth}-${currentDay}`);
        }

        getCurrentDate();
    }, []);

    const openModal = (meal:string) => {
        setModalIsOpen(true);
        setSelectedMeal(meal);
    }
    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedMeal(null);
        setFormData({
            name: '',
            calories: '',
            totalFat: '',
            cholesterol: '',
            sodium: '',
            totalCarbohydrate: '',
            protein: '',
            consumedAt: ''
        });
        setFormDataErrors({
            nameError: '',
            caloriesError: '',
            totalFatError: '',
            cholesterolError: '',
            sodiumError: '',
            totalCarbohydrateError: '',
            proteinError: '',
            consumedAtError: ''
        });
    }

    const isIntegerString = (str: string) => {
        return /^\d+$/.test(str);
    }

    const validateFormData = () => {
        // clear possible previous errors //
        setFormDataErrors({
            nameError: '',
            caloriesError: '',
            totalFatError: '',
            cholesterolError: '',
            sodiumError: '',
            totalCarbohydrateError: '',
            proteinError: '',
            consumedAtError: ''
        });

        // trim inputs //
        setFormData({
            name: formData.name.trim(),
            calories: formData.calories.trim(),
            totalFat: formData.totalFat.trim(),
            cholesterol: formData.cholesterol.trim(),
            sodium: formData.sodium.trim(),
            totalCarbohydrate: formData.totalCarbohydrate.trim(),
            protein: formData.protein.trim(),
            consumedAt: formData.consumedAt.trim()
        });

        // find input errors //
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
                updatedFormDataErrors.caloriesError = 'Calories can only be positive whole numbers.';
                errorCount++;
            }
        }
        if (formData.totalFat.length > 0) {
            if (!isIntegerString(formData.totalFat)) {
                updatedFormDataErrors.totalFatError = 'Total Fat can only be positive whole numbers.';
                errorCount++;
            }
        }
        if (formData.cholesterol.length > 0) {
            if (!isIntegerString(formData.cholesterol)) {
                updatedFormDataErrors.cholesterolError = 'Cholesterol can only be positive whole numbers.';
                errorCount++;
            }
        }
        if (formData.sodium.length > 0) {
            if (!isIntegerString(formData.sodium)) {
                updatedFormDataErrors.sodiumError = 'Sodium can only be positive whole numbers.';
                errorCount++;
            }
        }
        if (formData.totalCarbohydrate.length > 0) {
            if (!isIntegerString(formData.totalCarbohydrate)) {
                updatedFormDataErrors.totalCarbohydrateError = 'Total Carbohydrate can only be positive whole numbers.';
                errorCount++;
            }
        }
        if (formData.protein.length > 0) {
            if (!isIntegerString(formData.protein)) {
                updatedFormDataErrors.proteinError = 'Protein can only be positive whole numbers.';
                errorCount++;
            }
        }

        if (formData.consumedAt.length === 0) {
            updatedFormDataErrors.consumedAtError = 'Consumed At is required.';
            errorCount++;
        }
        else {
            const [datePart, timePart] = formData.consumedAt.split('T');
            if (datePart !== queryDate) {
                updatedFormDataErrors.consumedAtError = 'Consumed At date must be equal to the current date.';
                errorCount++;
            }
        }

        if (errorCount === 0) {
            // convert html timestamp to pgsql timestamp //
            const [datePart, timePart] = formData.consumedAt.split('T');
            const postgresTimestamp = `${datePart}T${timePart}`;
            setFormData((prevFormData) => ({
                ...prevFormData,
                consumedAt: postgresTimestamp
            }));
        }
        else {
            setFormDataErrors(updatedFormDataErrors);
        }

        return errorCount === 0;
    }

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        // prevent screen refresh //
        e.preventDefault();

        if (validateFormData()) {
            // determine api endpoint //
            let apiEndpoint = '';
            if (selectedMeal === 'Breakfast') {
                apiEndpoint = 'addBreakfast';
            }
            else if (selectedMeal === 'Lunch') {
                apiEndpoint = 'addLunch';
            }
            else if (selectedMeal === 'Dinner') {
                apiEndpoint = 'addDinner';
            }
            else if (selectedMeal === 'Snack') {
                apiEndpoint = 'addSnack';
            }

            // send api request //
            try {
                const response = await fetch(
                    `http://localhost:5000/api/v1/nutrition/${apiEndpoint}`,
                    {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    }
                );
                if (response.ok) {
                    console.log(response);
                } else {
                    const error = await response.json();
                    console.log(error);
                }
            } catch (err) {
                console.log(`Error: ${err}`);
                //toast.error('An error occurred, please try again.');
            }
        }
    }

    return (
        <Container>
            <div id='date-div'>
                <h1>{displayDate}</h1>
            </div>
            <div className='meals-div'>
                <h1>Breakfasts</h1>
                <div>
                    <p>Empty</p>
                </div>
                <button onClick={() => {
                    openModal('Breakfast')
                }}>
                    Add Breakfast
                </button>
            </div>
            <div className='meals-div'>
                <h1>Lunches</h1>
                <div>
                    <p>Empty</p>
                </div>
                <button onClick={() => {
                    openModal('Lunch')
                }}>
                    Add Lunch
                </button>
            </div>
            <div className='meals-div'>
                <h1>Dinners</h1>
                <div>
                    <p>Empty</p>
                </div>
                <button onClick={() => {
                    openModal('Dinner')
                }}>
                    Add Dinner
                </button>
            </div>
            <div className='meals-div'>
                <h1>Snacks</h1>
                <div>
                    <p>Empty</p>
                </div>
                <button onClick={() => {
                    openModal('Snack')
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
                            <label htmlFor='meal-name'>Name: <StyledFaStarOfLife /></label>
                            <input
                                id='meal-name'
                                type='text'
                                value={formData.name}
                                onChange={(e) => {
                                    setFormData((prevFormData) => ({
                                        ...prevFormData,
                                        name: e.target.value
                                    }));
                                }}
                                autoFocus
                            />
                        </div>

                        <div>
                            <p>{formDataErrors.caloriesError}</p>
                            <label htmlFor='meal-calories'>Calories:</label>
                            <input
                                id='meal-calories'
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
                            <label htmlFor='meal-total-fat' title='grams'>Total Fat:</label>
                            <input
                                id='meal-total-fat'
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
                            <label htmlFor='meal-cholesterol' title='milligrams'>Cholesterol:</label>
                            <input
                                id='meal-cholesterol'
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
                            <label htmlFor='meal-sodium' title='milligrams'>Sodium:</label>
                            <input
                                id='meal-sodium'
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
                            <label htmlFor='meal-total-carbohydrate' title='grams'>Total Carbohydrate:</label>
                            <input
                                id='meal-total-carbohydrate'
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
                            <label htmlFor='meal-protein' title='grams'>Protein:</label>
                            <input
                                id='meal-protein'
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
                            <p>{formDataErrors.consumedAtError}</p>
                            <label htmlFor='meal-timestamp'>Consumed At: <StyledFaStarOfLife /></label>
                            <input
                                id='meal-timestamp'
                                type='datetime-local'
                                value={formData.consumedAt}
                                onChange={(e) => {
                                    setFormData((prevFormData) => ({
                                        ...prevFormData,
                                        consumedAt: e.target.value
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
        height: auto;
        padding: 15px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        text-align: center;
        border: 1px solid black;

        h1 {
            margin: 5px 0 5px 0;
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
                cursor: pointer;
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
    font-size: 11px;
`;