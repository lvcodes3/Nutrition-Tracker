// dependencies //
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import styled from 'styled-components';
// context //
import { AuthContext } from '../context/AuthContext';
// assets //
import { FaXmark, FaStarOfLife } from 'react-icons/fa6';

// set the app root element //
Modal.setAppElement('#root');

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #D9D9D9;

    #date-div {
        border-bottom: 3px solid #4484CE;
        h1 {
            margin: 10px 0 10px 0;
            text-align: center;
        }
    }

    .meals-div {
        padding: 15px;
        text-align: center;

        h1 {
            margin: 0 0 5px 0;
            text-align: center;
        }

        table {
            margin: 0 auto;
            margin-bottom: 10px;
            width: 80%;
            padding: 2px;
            border: 1px solid black;
            border-collapse: collapse;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
            thead tr {
                background-color: #88BBD6;
            }
            .th1 {
                width: 20%;
                padding: 2px;
            }
            .th2, .th3, .th4, .th5, .th6, .th7, .th8 . th9 {
                width: 10%;
                padding: 2px;
            }
            .td1 {
                width: 20%;
                padding: 2px;
                background-color: white;
            }
            .td2, .td3, .td4, .td5, .td6, .td7, .td8, .td9 {
                width: 10%;
                padding: 2px;
                background-color: white;
            }
            tbody tr .td9 button {
                width: 40px;
                padding: 2px;
                cursor: pointer;
                background-color: white;
                border: 2px solid #88BBD6;
                border-radius: 10px;
            }
            tfoot tr {
                background-color: #88BBD6;
            }
            .tf1 {
                width: 20%;
                padding: 5px;
            }
            .tf2, .tf3, .tf4, .tf5, .tf6, .tf7, .tf8, .tf9 {
                width: 10%;
                padding: 5px;
                font-weight: bold;
            }
        }

        .add-meal-btn {
            width: 110px;
            height: 25px;
            cursor: pointer;
            font-weight: bold;
            background-color: white;
            border: 2px solid green;
            border-radius: 10px;
        }
    }

    #totals-div {
        padding: 15px;
        text-align: center;
        border-top: 3px solid #4484CE;

        h1 {
            margin: 0 0 5px 0;
            text-align: center;
        }

        table {
            margin: 0 auto;
            width: 70%;
            padding: 2px;
            border: 1px solid black;
            border-collapse: collapse;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
            thead tr {
                background-color: #88BBD6;
            }
            #tth1, #tth2, #tth3, #tth4, #tth5, #tth6 {
                width: 16.67%;
                padding: 2px;
            }
            #ttd1, #ttd2, #ttd3, #ttd4, #ttd5, #ttd6 {
                width: 16.67%;
                padding: 2px;
                background-color: white;
                font-weight: bold;
            }
        }
    }
`;

const Meals = () => {
    const { consumer, setConsumer } = useContext(AuthContext);

    const navigate = useNavigate();

    const [displayDate, setDisplayDate] = useState<null | string>(null);
    const [queryDate, setQueryDate] = useState<null | string>(null);
    const [selectedMeal, setSelectedMeal] = useState<null | string>(null);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    interface MealDataTypes {
        id: number;
        userId: number;
        mealType: string;
        name: string;
        calorie: null | number;
        fat: null | number;
        cholesterol: null | number;
        sodium: null | number;
        carbohydrate: null | number;
        protein: null | number;
        consumedAt: string;
        createdAt: string;
        updatedAt: null | string;
    };
    const [breakfasts, setBreakfasts] = useState<MealDataTypes[]>([]);
    const [lunches, setLunches] = useState<MealDataTypes[]>([]);
    const [dinners, setDinners] = useState<MealDataTypes[]>([]);
    const [snacks, setSnacks] = useState<MealDataTypes[]>([]);

    interface MealSumDataTypes {
        calorie: number;
        fat: number;
        cholesterol: number;
        sodium: number;
        carbohydrate: number;
        protein: number;
    };
    const [sumBreakfasts, setSumBreakfasts] = useState<MealSumDataTypes>({
        calorie: 0,
        fat: 0,
        cholesterol: 0,
        sodium: 0,
        carbohydrate: 0,
        protein: 0
    });
    const [sumLunches, setSumLunches] = useState<MealSumDataTypes>({
        calorie: 0,
        fat: 0,
        cholesterol: 0,
        sodium: 0,
        carbohydrate: 0,
        protein: 0
    });
    const [sumDinners, setSumDinners] = useState<MealSumDataTypes>({
        calorie: 0,
        fat: 0,
        cholesterol: 0,
        sodium: 0,
        carbohydrate: 0,
        protein: 0
    });
    const [sumSnacks, setSumSnacks] = useState<MealSumDataTypes>({
        calorie: 0,
        fat: 0,
        cholesterol: 0,
        sodium: 0,
        carbohydrate: 0,
        protein: 0
    });
    const [sumMeals, setSumMeals] = useState<MealSumDataTypes>({
        calorie: 0,
        fat: 0,
        cholesterol: 0,
        sodium: 0,
        carbohydrate: 0,
        protein: 0
    });

    interface FormDataTypes {
        name: string;
        calorie: string;
        fat: string;
        cholesterol: string;
        sodium: string;
        carbohydrate: string;
        protein: string;
        consumedAt: string;
    };
    const [formData, setFormData] = useState<FormDataTypes>({
        name: '',
        calorie: '',
        fat: '',
        cholesterol: '',
        sodium: '',
        carbohydrate: '',
        protein: '',
        consumedAt: ''
    });

    interface FormDataErrorTypes {
        name: string;
        calorie: string;
        fat: string;
        cholesterol: string;
        sodium: string;
        carbohydrate: string;
        protein: string;
        consumedAt: string;
    };
    const [formDataErrors, setFormDataErrors] = useState<FormDataErrorTypes>({
        name: '',
        calorie: '',
        fat: '',
        cholesterol: '',
        sodium: '',
        carbohydrate: '',
        protein: '',
        consumedAt: ''
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
                    const meals = await response.json();
                    console.log(meals);

                    let tempBreakfasts: MealDataTypes[] = [];
                    let tempLunches: MealDataTypes[] = [];
                    let tempDinners: MealDataTypes[] = [];
                    let tempSnacks: MealDataTypes[] = [];

                    let tempSumBreakfasts: MealSumDataTypes = {
                        calorie: 0,
                        fat: 0,
                        cholesterol: 0,
                        sodium: 0,
                        carbohydrate: 0,
                        protein: 0
                    };
                    let tempSumLunches: MealSumDataTypes = {
                        calorie: 0,
                        fat: 0,
                        cholesterol: 0,
                        sodium: 0,
                        carbohydrate: 0,
                        protein: 0
                    };
                    let tempSumDinners: MealSumDataTypes = {
                        calorie: 0,
                        fat: 0,
                        cholesterol: 0,
                        sodium: 0,
                        carbohydrate: 0,
                        protein: 0
                    };
                    let tempSumSnacks: MealSumDataTypes = {
                        calorie: 0,
                        fat: 0,
                        cholesterol: 0,
                        sodium: 0,
                        carbohydrate: 0,
                        protein: 0
                    };
                    let tempSumMeals: MealSumDataTypes = {
                        calorie: 0,
                        fat: 0,
                        cholesterol: 0,
                        sodium: 0,
                        carbohydrate: 0,
                        protein: 0
                    };

                    for (let i = 0; i < meals.length; i++) {
                        switch(meals[i].mealType) {
                            case 'breakfast':
                                tempBreakfasts.push(meals[i]);
                                if (meals[i].calories) {
                                    tempSumBreakfasts.calorie += meals[i].calorie;
                                    tempSumMeals.calorie += meals[i].calorie;
                                }
                                if (meals[i].fat) {
                                    tempSumBreakfasts.fat += meals[i].fat;
                                    tempSumMeals.fat += meals[i].fat;
                                }
                                if (meals[i].cholesterol) {
                                    tempSumBreakfasts.cholesterol += meals[i].cholesterol;
                                    tempSumMeals.cholesterol += meals[i].cholesterol;
                                }
                                if (meals[i].sodium) {
                                    tempSumBreakfasts.sodium += meals[i].sodium;
                                    tempSumMeals.sodium += meals[i].sodium;
                                }
                                if (meals[i].carbohydrate) {
                                    tempSumBreakfasts.carbohydrate += meals[i].carbohydrate;
                                    tempSumMeals.carbohydrate += meals[i].carbohydrate;
                                }
                                if (meals[i].protein) {
                                    tempSumBreakfasts.protein += meals[i].protein;
                                    tempSumMeals.protein += meals[i].protein;
                                }
                                break;
                            case 'lunch':
                                tempLunches.push(meals[i]);
                                if (meals[i].calorie) {
                                    tempSumLunches.calorie += meals[i].calorie;
                                    tempSumMeals.calorie += meals[i].calorie;
                                }
                                if (meals[i].fat) {
                                    tempSumLunches.fat += meals[i].fat;
                                    tempSumMeals.fat += meals[i].fat;
                                }
                                if (meals[i].cholesterol) {
                                    tempSumLunches.cholesterol += meals[i].cholesterol;
                                    tempSumMeals.cholesterol += meals[i].cholesterol;
                                }
                                if (meals[i].sodium) {
                                    tempSumLunches.sodium += meals[i].sodium;
                                    tempSumMeals.sodium += meals[i].sodium;
                                }
                                if (meals[i].carbohydrate) {
                                    tempSumLunches.carbohydrate += meals[i].carbohydrate;
                                    tempSumMeals.carbohydrate += meals[i].carbohydrate;
                                }
                                if (meals[i].protein) {
                                    tempSumLunches.protein += meals[i].protein;
                                    tempSumMeals.protein += meals[i].protein;
                                }
                                break;
                            case 'dinner':
                                tempDinners.push(meals[i]);
                                if (meals[i].calorie) {
                                    tempSumDinners.calorie += meals[i].calorie;
                                    tempSumMeals.calorie += meals[i].calorie;
                                }
                                if (meals[i].fat) {
                                    tempSumDinners.fat += meals[i].fat;
                                    tempSumMeals.fat += meals[i].fat;
                                }
                                if (meals[i].cholesterol) {
                                    tempSumDinners.cholesterol += meals[i].cholesterol;
                                    tempSumMeals.cholesterol += meals[i].cholesterol;
                                }
                                if (meals[i].sodium) {
                                    tempSumDinners.sodium += meals[i].sodium;
                                    tempSumMeals.sodium += meals[i].sodium;
                                }
                                if (meals[i].carbohydrate) {
                                    tempSumDinners.carbohydrate += meals[i].carbohydrate;
                                    tempSumMeals.carbohydrate += meals[i].carbohydrate;
                                }
                                if (meals[i].protein) {
                                    tempSumDinners.protein += meals[i].protein;
                                    tempSumMeals.protein += meals[i].protein;
                                }
                                break;
                            case 'snack':
                                tempSnacks.push(meals[i]);
                                if (meals[i].calorie) {
                                    tempSumSnacks.calorie += meals[i].calorie;
                                    tempSumMeals.calorie += meals[i].calorie;
                                }
                                if (meals[i].fat) {
                                    tempSumSnacks.fat += meals[i].fat;
                                    tempSumMeals.fat += meals[i].fat;
                                }
                                if (meals[i].cholesterol) {
                                    tempSumSnacks.cholesterol += meals[i].cholesterol;
                                    tempSumMeals.cholesterol += meals[i].cholesterol;
                                }
                                if (meals[i].sodium) {
                                    tempSumSnacks.sodium += meals[i].sodium;
                                    tempSumMeals.sodium += meals[i].sodium;
                                }
                                if (meals[i].carbohydrate) {
                                    tempSumSnacks.carbohydrate += meals[i].carbohydrate;
                                    tempSumMeals.carbohydrate += meals[i].carbohydrate;
                                }
                                if (meals[i].protein) {
                                    tempSumSnacks.protein += meals[i].protein;
                                    tempSumMeals.protein += meals[i].protein;
                                }
                                break;
                        }
                    }

                    setBreakfasts(tempBreakfasts);
                    setLunches(tempLunches);
                    setDinners(tempDinners);
                    setSnacks(tempSnacks);
                    setSumBreakfasts(tempSumBreakfasts);
                    setSumLunches(tempSumLunches);
                    setSumDinners(tempSumDinners);
                    setSumSnacks(tempSumSnacks);
                    setSumMeals(tempSumMeals);
                }
            }
            catch (err) {
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
            calorie: '',
            fat: '',
            cholesterol: '',
            sodium: '',
            carbohydrate: '',
            protein: '',
            consumedAt: ''
        });
        setFormDataErrors({
            name: '',
            calorie: '',
            fat: '',
            cholesterol: '',
            sodium: '',
            carbohydrate: '',
            protein: '',
            consumedAt: ''
        });
    }

    const isIntegerString = (str: string) => {
        return /^\d+$/.test(str);
    }

    const validateFormData = () => {
        // clear possible previous errors //
        setFormDataErrors({
            name: '',
            calorie: '',
            fat: '',
            cholesterol: '',
            sodium: '',
            carbohydrate: '',
            protein: '',
            consumedAt: ''
        });

        // trim inputs //
        setFormData({
            name: formData.name.trim(),
            calorie: formData.calorie.trim(),
            fat: formData.fat.trim(),
            cholesterol: formData.cholesterol.trim(),
            sodium: formData.sodium.trim(),
            carbohydrate: formData.carbohydrate.trim(),
            protein: formData.protein.trim(),
            consumedAt: formData.consumedAt.trim()
        });

        // find input errors //
        let errorCount: number = 0;
        let updatedFormDataErrors = { ...formDataErrors };

        if (formData.name.length === 0) {
            updatedFormDataErrors.name = 'Name is required.';
            errorCount++;
        }
        else if (formData.name.length > 50) {
            updatedFormDataErrors.name = 'Name can only be up to 50 characters in length.';
            errorCount++;
        }

        if (formData.calorie.length > 0) {
            if (!isIntegerString(formData.calorie)) {
                updatedFormDataErrors.calorie = 'Calorie can only be positive whole numbers.';
                errorCount++;
            }
        }
        if (formData.fat.length > 0) {
            if (!isIntegerString(formData.fat)) {
                updatedFormDataErrors.fat = 'Fat can only be positive whole numbers.';
                errorCount++;
            }
        }
        if (formData.cholesterol.length > 0) {
            if (!isIntegerString(formData.cholesterol)) {
                updatedFormDataErrors.cholesterol = 'Cholesterol can only be positive whole numbers.';
                errorCount++;
            }
        }
        if (formData.sodium.length > 0) {
            if (!isIntegerString(formData.sodium)) {
                updatedFormDataErrors.sodium = 'Sodium can only be positive whole numbers.';
                errorCount++;
            }
        }
        if (formData.carbohydrate.length > 0) {
            if (!isIntegerString(formData.carbohydrate)) {
                updatedFormDataErrors.carbohydrate = 'Carbohydrate can only be positive whole numbers.';
                errorCount++;
            }
        }
        if (formData.protein.length > 0) {
            if (!isIntegerString(formData.protein)) {
                updatedFormDataErrors.protein = 'Protein can only be positive whole numbers.';
                errorCount++;
            }
        }

        if (formData.consumedAt.length === 0) {
            updatedFormDataErrors.consumedAt = 'Consumed at is required.';
            errorCount++;
        }
        else {
            const [datePart, timePart] = formData.consumedAt.split('T');
            if (datePart !== queryDate) {
                updatedFormDataErrors.consumedAt = 'Consumed at date must be equal to the current date.';
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
                    const newMeal = await response.json();

                    switch(selectedMeal) {
                        case 'Breakfast':
                            setBreakfasts((prevBreakfasts) => [...prevBreakfasts, newMeal]);

                            let tempSumBreakfasts: MealSumDataTypes = {
                                calorie: sumBreakfasts.calorie + (newMeal?.calories || 0),
                                fat: sumBreakfasts.fat + (newMeal?.totalFat || 0),
                                cholesterol: sumBreakfasts.cholesterol + (newMeal?.cholesterol || 0),
                                sodium: sumBreakfasts.sodium + (newMeal?.sodium || 0),
                                carbohydrate: sumBreakfasts.carbohydrate + (newMeal?.totalCarbohydrate || 0),
                                protein: sumBreakfasts.protein + (newMeal?.protein || 0)
                            }
                            setSumBreakfasts(tempSumBreakfasts);

                            break;
                        case 'Lunch':
                            setLunches((prevLunches) => [...prevLunches, newMeal]);

                            let tempSumLunches: MealSumDataTypes = {
                                calorie: sumLunches.calorie + (newMeal?.calories || 0),
                                fat: sumLunches.fat + (newMeal?.totalFat || 0),
                                cholesterol: sumLunches.cholesterol + (newMeal?.cholesterol || 0),
                                sodium: sumLunches.sodium + (newMeal?.sodium || 0),
                                carbohydrate: sumLunches.carbohydrate + (newMeal?.totalCarbohydrate || 0),
                                protein: sumLunches.protein + (newMeal?.protein || 0)
                            }
                            setSumLunches(tempSumLunches);

                            break;
                        case 'Dinner':
                            setDinners((prevDinners) => [...prevDinners, newMeal]);

                            let tempSumDinners: MealSumDataTypes = {
                                calorie: sumDinners.calorie + (newMeal?.calories || 0),
                                fat: sumDinners.fat + (newMeal?.totalFat || 0),
                                cholesterol: sumDinners.cholesterol + (newMeal?.cholesterol || 0),
                                sodium: sumDinners.sodium + (newMeal?.sodium || 0),
                                carbohydrate: sumDinners.carbohydrate + (newMeal?.totalCarbohydrate || 0),
                                protein: sumDinners.protein + (newMeal?.protein || 0)
                            }
                            setSumDinners(tempSumDinners);

                            break;
                        case 'Snack':
                            setSnacks((prevSnacks) => [...prevSnacks, newMeal]);

                            let tempSumSnacks: MealSumDataTypes = {
                                calorie: sumSnacks.calorie + (newMeal?.calories || 0),
                                fat: sumSnacks.fat + (newMeal?.totalFat || 0),
                                cholesterol: sumSnacks.cholesterol + (newMeal?.cholesterol || 0),
                                sodium: sumSnacks.sodium + (newMeal?.sodium || 0),
                                carbohydrate: sumSnacks.carbohydrate + (newMeal?.totalCarbohydrate || 0),
                                protein: sumSnacks.protein + (newMeal?.protein || 0)
                            }
                            setSumSnacks(tempSumSnacks);

                            break;
                    }

                    let tempSumMeals: MealSumDataTypes = {
                        calorie: sumBreakfasts.calorie + sumLunches.calorie + sumDinners.calorie + sumSnacks.calorie,
                        fat: sumBreakfasts.fat + sumLunches.fat + sumLunches.fat + sumSnacks.fat,
                        cholesterol: sumBreakfasts.cholesterol + sumLunches.cholesterol + sumDinners.cholesterol + sumSnacks.cholesterol,
                        sodium: sumBreakfasts.sodium + sumLunches.sodium + sumDinners.sodium + sumSnacks.sodium,
                        carbohydrate: sumBreakfasts.carbohydrate + sumLunches.carbohydrate + sumDinners.carbohydrate + sumSnacks.carbohydrate,
                        protein: sumBreakfasts.protein + sumLunches.protein + sumDinners.protein + sumSnacks.protein
                    }
                    setSumMeals(tempSumMeals);
                } 
                else {
                    const error = await response.json();
                    console.log(error);
                }
            } 
            catch (err) {
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
                <h1>Breakfast</h1>
                {
                    breakfasts.length > 0 && (
                        <table>
                            <thead>
                                <tr>
                                    <th className='th1' scope='col'>Name</th>
                                    <th className='th2' scope='col'>Calories</th>
                                    <th className='th3' scope='col'>Fat</th>
                                    <th className='th4' scope='col'>Cholesterol</th>
                                    <th className='th5' scope='col'>Sodium</th>
                                    <th className='th6' scope='col'>Carbohydrate</th>
                                    <th className='th7' scope='col'>Protein</th>
                                    <th className='th8' scope='col'>Consumed At</th>
                                    <th className='th9' scope='col'>Edit?</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                breakfasts.map((breakfast) => (
                                    <tr key={breakfast.id}>
                                        <td className='td1'>{breakfast.name}</td>
                                        <td className='td2'>{breakfast.calorie === null ? '0' : breakfast.calorie}</td>
                                        <td className='td3'>{breakfast.fat === null ? '0' : breakfast.fat}</td>
                                        <td className='td4'>{breakfast.cholesterol === null ? '0' : breakfast.cholesterol}</td>
                                        <td className='td5'>{breakfast.sodium === null ? '0' : breakfast.sodium}</td>
                                        <td className='td6'>{breakfast.carbohydrate === null ? '0' : breakfast.carbohydrate}</td>
                                        <td className='td7'>{breakfast.protein === null ? '0' : breakfast.protein}</td>
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
                            <tfoot>
                                <tr>
                                    <th className='tf1' scope='row'>Totals</th>
                                    <td className='tf2'>{sumBreakfasts.calorie}</td>
                                    <td className='tf3'>{sumBreakfasts.fat}g</td>
                                    <td className='tf4'>{sumBreakfasts.cholesterol}mg</td>
                                    <td className='tf5'>{sumBreakfasts.sodium}mg</td>
                                    <td className='tf6'>{sumBreakfasts.carbohydrate}g</td>
                                    <td className='tf7'>{sumBreakfasts.protein}g</td>
                                    <td className='tf8'></td>
                                    <td className='tf9'></td>
                                </tr>
                            </tfoot>
                        </table>
                    )
                }
                <button className='add-meal-btn' onClick={() => {
                    openModal('Breakfast')
                }}>
                    Add Breakfast
                </button>
            </div>

            <br />

            <div className='meals-div'>
                <h1>Lunch</h1>
                {
                    lunches.length > 0 && (
                        <table>
                            <thead>
                                <tr>
                                    <th className='th1' scope='col'>Name</th>
                                    <th className='th2' scope='col'>Calories</th>
                                    <th className='th3' scope='col'>Fat</th>
                                    <th className='th4' scope='col'>Cholesterol</th>
                                    <th className='th5' scope='col'>Sodium</th>
                                    <th className='th6' scope='col'>Carbohydrate</th>
                                    <th className='th7' scope='col'>Protein</th>
                                    <th className='th8' scope='col'>Consumed At</th>
                                    <th className='th9' scope='col'>Edit?</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                lunches.map((lunch) => (
                                    <tr key={lunch.id}>
                                        <td className='td1'>{lunch.name}</td>
                                        <td className='td2'>{lunch.calorie === null ? '0' : lunch.calorie}</td>
                                        <td className='td3'>{lunch.fat === null ? '0' : lunch.fat}</td>
                                        <td className='td4'>{lunch.cholesterol === null ? '0' : lunch.cholesterol}</td>
                                        <td className='td5'>{lunch.sodium === null ? '0' : lunch.sodium}</td>
                                        <td className='td6'>{lunch.carbohydrate === null ? '0' : lunch.carbohydrate}</td>
                                        <td className='td7'>{lunch.protein === null ? '0' : lunch.protein}</td>
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
                            <tfoot>
                                <tr>
                                    <th className='tf1' scope='row'>Totals</th>
                                    <td className='tf2'>{sumLunches.calorie}</td>
                                    <td className='tf3'>{sumLunches.fat}g</td>
                                    <td className='tf4'>{sumLunches.cholesterol}mg</td>
                                    <td className='tf5'>{sumLunches.sodium}mg</td>
                                    <td className='tf6'>{sumLunches.carbohydrate}g</td>
                                    <td className='tf7'>{sumLunches.protein}g</td>
                                    <td className='tf8'></td>
                                    <td className='tf9'></td>
                                </tr>
                            </tfoot>
                        </table>
                    )
                }
                <button className='add-meal-btn' onClick={() => {
                    openModal('Lunch')
                }}>
                    Add Lunch
                </button>
            </div>

            <br />

            <div className='meals-div'>
                <h1>Dinner</h1>
                {
                    dinners.length > 0 && (
                        <table>
                            <thead>
                                <tr>
                                    <th className='th1' scope='col'>Name</th>
                                    <th className='th2' scope='col'>Calories</th>
                                    <th className='th3' scope='col'>Fat</th>
                                    <th className='th4' scope='col'>Cholesterol</th>
                                    <th className='th5' scope='col'>Sodium</th>
                                    <th className='th6' scope='col'>Carbohydrate</th>
                                    <th className='th7' scope='col'>Protein</th>
                                    <th className='th8' scope='col'>Consumed At</th>
                                    <th className='th9' scope='col'>Edit?</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                dinners.map((dinner) => (
                                    <tr key={dinner.id}>
                                        <td className='td1'>{dinner.name}</td>
                                        <td className='td2'>{dinner.calorie === null ? '0' : dinner.calorie}</td>
                                        <td className='td3'>{dinner.fat === null ? '0' : dinner.fat}</td>
                                        <td className='td4'>{dinner.cholesterol === null ? '0' : dinner.cholesterol}</td>
                                        <td className='td5'>{dinner.sodium === null ? '0' : dinner.sodium}</td>
                                        <td className='td6'>{dinner.carbohydrate === null ? '0' : dinner.carbohydrate}</td>
                                        <td className='td7'>{dinner.protein === null ? '0' : dinner.protein}</td>
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
                            <tfoot>
                                <tr>
                                    <th className='tf1' scope='row'>Totals</th>
                                    <td className='tf2'>{sumDinners.calorie}</td>
                                    <td className='tf3'>{sumDinners.fat}</td>
                                    <td className='tf4'>{sumDinners.cholesterol}</td>
                                    <td className='tf5'>{sumDinners.sodium}mg</td>
                                    <td className='tf6'>{sumDinners.carbohydrate}g</td>
                                    <td className='tf7'>{sumDinners.protein}g</td>
                                    <td className='tf8'></td>
                                    <td className='tf9'></td>
                                </tr>
                            </tfoot>
                        </table>
                    )
                }
                <button className='add-meal-btn' onClick={() => {
                    openModal('Dinner')
                }}>
                    Add Dinner
                </button>
            </div>

            <br />

            <div className='meals-div'>
                <h1>Snack</h1>
                {
                    snacks.length > 0 && (
                        <table>
                            <thead>
                                <tr>
                                    <th className='th1' scope='col'>Name</th>
                                    <th className='th2' scope='col'>Calories</th>
                                    <th className='th3' scope='col'>Fat</th>
                                    <th className='th4' scope='col'>Cholesterol</th>
                                    <th className='th5' scope='col'>Sodium</th>
                                    <th className='th6' scope='col'>Carbohydrate</th>
                                    <th className='th7' scope='col'>Protein</th>
                                    <th className='th8' scope='col'>Consumed At</th>
                                    <th className='th9' scope='col'>Edit?</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                snacks.map((snack) => (
                                    <tr key={snack.id}>
                                        <td className='td1'>{snack.name}</td>
                                        <td className='td2'>{snack.calorie === null ? '0' : snack.calorie}</td>
                                        <td className='td3'>{snack.fat === null ? '0' : snack.fat}</td>
                                        <td className='td4'>{snack.cholesterol === null ? '0' : snack.cholesterol}</td>
                                        <td className='td5'>{snack.sodium === null ? '0' : snack.sodium}</td>
                                        <td className='td6'>{snack.carbohydrate === null ? '0' : snack.carbohydrate}</td>
                                        <td className='td7'>{snack.protein === null ? '0' : snack.protein}</td>
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
                            <tfoot>
                                <tr>
                                    <th className='tf1' scope='row'>Totals</th>
                                    <td className='tf2'>{sumSnacks.calorie}</td>
                                    <td className='tf3'>{sumSnacks.fat}</td>
                                    <td className='tf4'>{sumSnacks.cholesterol}</td>
                                    <td className='tf5'>{sumSnacks.sodium}mg</td>
                                    <td className='tf6'>{sumSnacks.carbohydrate}g</td>
                                    <td className='tf7'>{sumSnacks.protein}g</td>
                                    <td className='tf8'></td>
                                    <td className='tf9'></td>
                                </tr>
                            </tfoot>
                        </table>
                    )
                }
                <button className='add-meal-btn' onClick={() => {
                    openModal('Snack')
                }}>
                    Add Snack
                </button>
            </div>

            <br/>

            <div id='totals-div'>
                <h1>Totals</h1>
                <table>
                    <thead>
                        <tr>
                            <th id='tth1' scope='col'>Calories</th>
                            <th id='tth2' scope='col'>Fat</th>
                            <th id='tth3' scope='col'>Cholesterol</th>
                            <th id='tth4' scope='col'>Sodium</th>
                            <th id='tth5' scope='col'>Carbohydrate</th>
                            <th id='tth6' scope='col'>Protein</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td id='ttd1'>{sumMeals.calorie === null ? '0' : sumMeals.calorie}</td>
                            <td id='ttd2'>{sumMeals.fat === null ? '0' : sumMeals.fat}</td>
                            <td id='ttd3'>{sumMeals.cholesterol === null ? '0' : sumMeals.cholesterol}</td>
                            <td id='ttd4'>{sumMeals.sodium === null ? '0' : sumMeals.sodium}mg</td>
                            <td id='ttd5'>{sumMeals.carbohydrate === null ? '0' : sumMeals.carbohydrate}g</td>
                            <td id='ttd6'>{sumMeals.protein === null ? '0' : sumMeals.protein}g</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <br />

            <CustomModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel='Modal'
            >
                <div id='content-modal-div'>
                    <button id='modal-exit-btn' onClick={closeModal}><StyledFaXmark /></button>
                    <h1>{selectedMeal}</h1>

                    <form onSubmit={submitForm}>
                        <div>
                            <p>{formDataErrors.name}</p>
                            <label htmlFor='meal-name'><b>Name:</b> <StyledFaStarOfLife /></label>
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
                            <p>{formDataErrors.calorie}</p>
                            <label htmlFor='meal-calories'><b>Calories:</b></label>
                            <input
                                id='meal-calories'
                                type='number'
                                value={formData.calorie}
                                onChange={(e) => {
                                    setFormData((prevFormData) => ({
                                        ...prevFormData,
                                        calorie: e.target.value
                                    }));
                                }}
                            />
                        </div>

                        <div>
                            <label htmlFor='meal-total-fat'><b>Total Fat:</b> (grams)</label>
                            <input
                                id='meal-total-fat'
                                type='number'
                                value={formData.fat}
                                onChange={(e) => {
                                    setFormData((prevFormData) => ({
                                        ...prevFormData,
                                        fat: e.target.value
                                    }));
                                }}
                            />
                        </div>

                        <div>
                            <label htmlFor='meal-cholesterol'><b>Cholesterol:</b> (milligrams)</label>
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
                            <label htmlFor='meal-sodium'><b>Sodium:</b> (milligrams)</label>
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
                            <label htmlFor='meal-total-carbohydrate'><b>Carbohydrate:</b> (grams)</label>
                            <input
                                id='meal-total-carbohydrate'
                                type='number'
                                value={formData.carbohydrate}
                                onChange={(e) => {
                                    setFormData((prevFormData) => ({
                                        ...prevFormData,
                                        carbohydrate: e.target.value
                                    }));
                                }}
                            />
                        </div>

                        <div>
                            <label htmlFor='meal-protein'><b>Protein:</b> (grams)</label>
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
                            <p>{formDataErrors.consumedAt}</p>
                            <label htmlFor='meal-timestamp'><b>Consumed At:</b> <StyledFaStarOfLife /></label>
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

        #modal-exit-btn {
            float: right;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: red;
            border: 1px solid black;
            border-radius: 10px;
        }

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
                color: white;
                background-color: black;
                cursor: pointer;
            }
        }
    }
`;
const StyledFaXmark = styled(FaXmark)`
    color: white;
    font-size: 20px;
`;
const StyledFaStarOfLife = styled(FaStarOfLife)`
    color: red;
    font-size: 11px;
`;