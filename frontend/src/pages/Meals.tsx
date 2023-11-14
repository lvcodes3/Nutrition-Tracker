// dependencies //
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import styled from 'styled-components';
// context //
import { AuthContext } from '../context/AuthContext';
// assets //
import { FaRectangleXmark, FaStarOfLife } from 'react-icons/fa6';

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
            table {
                margin: 0 auto;
                width: 80%;
                border: 1px solid black;
                border-collapse: collapse;
                .th1, .td1 {
                    width: 15%;
                    padding: 3px;
                    border: 1px solid black;
                }
                .th2, .td2 {
                    width: 10%;
                    padding: 3px;
                    border: 1px solid black;
                }
                .th3, .td3 {
                    width: 10%;
                    padding: 3px;
                    border: 1px solid black;
                }
                .th4, .td4 {
                    width: 10%;
                    padding: 3px;
                    border: 1px solid black;
                }
                .th5, .td5 {
                    width: 10%;
                    padding: 3px;
                    border: 1px solid black;
                }
                .th6, .td6 {
                    width: 10%;
                    padding: 3px;
                    border: 1px solid black;
                }
                .th7, .td7 {
                    width: 10%;
                    padding: 3px;
                    border: 1px solid black;
                }
                .th8, .td8 {
                    width: 10%;
                    padding: 3px;
                    border: 1px solid black;
                }
                .th9, .td9 {
                    width: 5%;
                    padding: 3px;
                    border: 1px solid black;
                }
            }
        }

        button {
            cursor: pointer;
            background-color: white;
            border: 1px solid black;
            border-radius: 10px;
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
        mealType: string;
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
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);

                    let dbBreakfasts: MealDataTypes[] = [];
                    let dbLunches: MealDataTypes[] = [];
                    let dbDinners: MealDataTypes[] = [];
                    let dbSnacks: MealDataTypes[] = [];

                    for (let i = 0; i < data.length; i++) {
                        switch(data[i].meal_type) {
                            case 'breakfast':
                                dbBreakfasts.push({
                                    id: data[i].id,
                                    userId: data[i].user_id,
                                    mealType: data[i].meal_type,
                                    name: data[i].name,
                                    calories: data[i].calories,
                                    totalFat: data[i].total_fat,
                                    cholesterol: data[i].cholesterol,
                                    sodium: data[i].sodium,
                                    totalCarbohydrate: data[i].total_carbohydrate,
                                    protein: data[i].protein,
                                    consumedAt: data[i].consumed_at,
                                    createdAt: data[i].created_at,
                                    updatedAt: data[i].updated_at
                                });
                                break;
                            case 'lunch':
                                dbLunches.push({
                                    id: data[i].id,
                                    userId: data[i].user_id,
                                    mealType: data[i].meal_type,
                                    name: data[i].name,
                                    calories: data[i].calories,
                                    totalFat: data[i].total_fat,
                                    cholesterol: data[i].cholesterol,
                                    sodium: data[i].sodium,
                                    totalCarbohydrate: data[i].total_carbohydrate,
                                    protein: data[i].protein,
                                    consumedAt: data[i].consumed_at,
                                    createdAt: data[i].created_at,
                                    updatedAt: data[i].updated_at
                                });
                                break;
                            case 'dinner':
                                dbDinners.push({
                                    id: data[i].id,
                                    userId: data[i].user_id,
                                    mealType: data[i].meal_type,
                                    name: data[i].name,
                                    calories: data[i].calories,
                                    totalFat: data[i].total_fat,
                                    cholesterol: data[i].cholesterol,
                                    sodium: data[i].sodium,
                                    totalCarbohydrate: data[i].total_carbohydrate,
                                    protein: data[i].protein,
                                    consumedAt: data[i].consumed_at,
                                    createdAt: data[i].created_at,
                                    updatedAt: data[i].updated_at
                                });
                                break;
                            case 'snack':
                                dbSnacks.push({
                                    id: data[i].id,
                                    userId: data[i].user_id,
                                    mealType: data[i].meal_type,
                                    name: data[i].name,
                                    calories: data[i].calories,
                                    totalFat: data[i].total_fat,
                                    cholesterol: data[i].cholesterol,
                                    sodium: data[i].sodium,
                                    totalCarbohydrate: data[i].total_carbohydrate,
                                    protein: data[i].protein,
                                    consumedAt: data[i].consumed_at,
                                    createdAt: data[i].created_at,
                                    updatedAt: data[i].updated_at
                                });
                                break;
                            default:
                                break;
                        }
                    }

                    setBreakfasts(dbBreakfasts);
                    setLunches(dbLunches);
                    setDinners(dbDinners);
                    setSnacks(dbSnacks);
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
                {
                    breakfasts.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th className='th1'>Name</th>
                                    <th className='th2'>Calories</th>
                                    <th className='th3'>Total Fat</th>
                                    <th className='th4'>Cholesterol</th>
                                    <th className='th5'>Sodium</th>
                                    <th className='th6'>Total Carbohydrate</th>
                                    <th className='th7'>Protein</th>
                                    <th className='th8'>Consumed At</th>
                                    <th className='th9'>Edit?</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                breakfasts.map((breakfast) => (
                                    <tr key={breakfast.id}>
                                        <td className='td1'>{breakfast.name}</td>
                                        <td className='td2'>{breakfast.calories === null ? 'N/A' : breakfast.calories}</td>
                                        <td className='td3'>{breakfast.totalFat === null ? 'N/A' : breakfast.totalFat}</td>
                                        <td className='td4'>{breakfast.cholesterol === null ? 'N/A' : breakfast.cholesterol}</td>
                                        <td className='td5'>{breakfast.sodium === null ? 'N/A' : breakfast.sodium}</td>
                                        <td className='td6'>{breakfast.totalCarbohydrate === null ? 'N/A' : breakfast.totalCarbohydrate}</td>
                                        <td className='td7'>{breakfast.protein === null ? 'N/A' : breakfast.protein}</td>
                                        <td className='td8'>
                                        {
                                            new Date(breakfast.consumedAt).toLocaleString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                second: '2-digit',
                                                timeZoneName: 'short'
                                            })
                                        }
                                        </td>
                                        <td className='td9'><button>Edit</button></td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    ) : (
                        <p>No Data</p>
                    )
                }
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
                {
                    lunches.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th className='th1'>Name</th>
                                    <th className='th2'>Calories</th>
                                    <th className='th3'>Total Fat</th>
                                    <th className='th4'>Cholesterol</th>
                                    <th className='th5'>Sodium</th>
                                    <th className='th6'>Total Carbohydrate</th>
                                    <th className='th7'>Protein</th>
                                    <th className='th8'>Consumed At</th>
                                    <th className='th9'>Edit?</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                lunches.map((lunch) => (
                                    <tr key={lunch.id}>
                                        <td className='td1'>{lunch.name}</td>
                                        <td className='td2'>{lunch.calories === null ? 'N/A' : lunch.calories}</td>
                                        <td className='td3'>{lunch.totalFat === null ? 'N/A' : lunch.totalFat}</td>
                                        <td className='td4'>{lunch.cholesterol === null ? 'N/A' : lunch.cholesterol}</td>
                                        <td className='td5'>{lunch.sodium === null ? 'N/A' : lunch.sodium}</td>
                                        <td className='td6'>{lunch.totalCarbohydrate === null ? 'N/A' : lunch.totalCarbohydrate}</td>
                                        <td className='td7'>{lunch.protein === null ? 'N/A' : lunch.protein}</td>
                                        <td className='td8'>
                                        {
                                            new Date(lunch.consumedAt).toLocaleString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                second: '2-digit',
                                                timeZoneName: 'short'
                                            })
                                        }
                                        </td>
                                        <td className='td9'><button>Edit</button></td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    ) : (
                        <p>No Data</p>
                    )
                }
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
                {
                    dinners.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th className='th1'>Name</th>
                                    <th className='th2'>Calories</th>
                                    <th className='th3'>Total Fat</th>
                                    <th className='th4'>Cholesterol</th>
                                    <th className='th5'>Sodium</th>
                                    <th className='th6'>Total Carbohydrate</th>
                                    <th className='th7'>Protein</th>
                                    <th className='th8'>Consumed At</th>
                                    <th className='th9'>Edit?</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                dinners.map((dinner) => (
                                    <tr key={dinner.id}>
                                        <td className='td1'>{dinner.name}</td>
                                        <td className='td2'>{dinner.calories === null ? 'N/A' : dinner.calories}</td>
                                        <td className='td3'>{dinner.totalFat === null ? 'N/A' : dinner.totalFat}</td>
                                        <td className='td4'>{dinner.cholesterol === null ? 'N/A' : dinner.cholesterol}</td>
                                        <td className='td5'>{dinner.sodium === null ? 'N/A' : dinner.sodium}</td>
                                        <td className='td6'>{dinner.totalCarbohydrate === null ? 'N/A' : dinner.totalCarbohydrate}</td>
                                        <td className='td7'>{dinner.protein === null ? 'N/A' : dinner.protein}</td>
                                        <td className='td8'>
                                        {
                                            new Date(dinner.consumedAt).toLocaleString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                second: '2-digit',
                                                timeZoneName: 'short'
                                            })
                                        }
                                        </td>
                                        <td className='td9'><button>Edit</button></td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    ) : (
                        <p>No Data</p>
                    )
                }
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
                {
                    snacks.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th className='th1'>Name</th>
                                    <th className='th2'>Calories</th>
                                    <th className='th3'>Total Fat</th>
                                    <th className='th4'>Cholesterol</th>
                                    <th className='th5'>Sodium</th>
                                    <th className='th6'>Total Carbohydrate</th>
                                    <th className='th7'>Protein</th>
                                    <th className='th8'>Consumed At</th>
                                    <th className='th9'>Edit?</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                snacks.map((snack) => (
                                    <tr key={snack.id}>
                                        <td className='td1'>{snack.name}</td>
                                        <td className='td2'>{snack.calories === null ? 'N/A' : snack.calories}</td>
                                        <td className='td3'>{snack.totalFat === null ? 'N/A' : snack.totalFat}</td>
                                        <td className='td4'>{snack.cholesterol === null ? 'N/A' : snack.cholesterol}</td>
                                        <td className='td5'>{snack.sodium === null ? 'N/A' : snack.sodium}</td>
                                        <td className='td6'>{snack.totalCarbohydrate === null ? 'N/A' : snack.totalCarbohydrate}</td>
                                        <td className='td7'>{snack.protein === null ? 'N/A' : snack.protein}</td>
                                        <td className='td8'>
                                        {
                                            new Date(snack.consumedAt).toLocaleString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                second: '2-digit',
                                                timeZoneName: 'short'
                                            })
                                        }
                                        </td>
                                        <td className='td9'><button>Edit</button></td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    ) : (
                        <p>No Data</p>
                    )
                }
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
                    <StyledFaRectangleXmark onClick={closeModal}/>
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
        background-color: #88BBD6;
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
const StyledFaRectangleXmark = styled(FaRectangleXmark)`
    color: red;
    font-size: 20px;
    float: right;
    cursor: pointer;
`;
const StyledFaStarOfLife = styled(FaStarOfLife)`
    color: red;
    font-size: 11px;
`;