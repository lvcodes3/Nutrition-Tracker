// dependencies //
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import styled from 'styled-components';
// context //
import { AuthContext } from '../context/AuthContext';
// assets //
import { FaArrowLeft, FaArrowRight, FaXmark, FaStarOfLife } from 'react-icons/fa6';

// set the app root element //
Modal.setAppElement('#root');

const Container = styled.div`
    width: 100%;
    min-height: calc(100vh - 100px);
    display: flex;
    flex-direction: column;
    background-color: #D9D9D9;

    #date-div {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        border-bottom: 3px solid #4484CE;
        h1 {
            margin: 10px 0 10px 0;
            text-align: center;
        }
        button {
            display: flex;
            justify-content: center;
            cursor: pointer;
            background-color: white;
            border: 3px solid #4484CE;
            border-radius: 10px;
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
                padding: 5px;
            }
            .th2, .th3, .th4, .th5, .th6, .th7, .th8 {
                width: 10%;
                padding: 5px;
            }
            .th9, .th10 {
                width: 5%;
                padding: 5px;
            }
            .td1 {
                width: 20%;
                padding: 5px;
                background-color: white;
            }
            .td2, .td3, .td4, .td5, .td6, .td7, .td8 {
                width: 10%;
                padding: 5px;
                background-color: white;
            }
            .td9, .td10 {
                width: 5%;
                padding: 5px;
                background-color: white;
            }
            tbody tr .td9 button {
                cursor: pointer;
                background-color: white;
                border: 3px solid orange;
                border-radius: 10px;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
            }
            tbody tr .td10 button {
                cursor: pointer;
                background-color: white;
                border: 3px solid red;
                border-radius: 10px;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
            }
            tfoot tr {
                background-color: #88BBD6;
            }
            .tf1 {
                width: 20%;
                padding: 5px;
            }
            .tf2, .tf3, .tf4, .tf5, .tf6, .tf7, .tf8 {
                width: 10%;
                padding: 5px;
                font-weight: bold;
            }
            .tf9, .tf10 {
                width: 5%;
                padding: 5px;
            }
        }

        .add-meal-btn {
            width: auto;
            height: 25px;
            cursor: pointer;
            font-weight: bold;
            background-color: white;
            border: 3px solid green;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
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
                padding: 5px;
            }
            #ttd1, #ttd2, #ttd3, #ttd4, #ttd5, #ttd6 {
                width: 16.67%;
                padding: 5px;
                background-color: white;
                font-weight: bold;
            }
        }
    }
`;
const StyledFaArrowLeft = styled(FaArrowLeft)`
    color: #4484CE;
`;
const StyledFaArrowRight = styled(FaArrowRight)`
    color: #4484CE;
`;

interface MealsProps {
    displayDate: null | string;
    setDisplayDate: (newDisplayDate: string) => void;
    queryDate: null | string;
    setQueryDate: (newQueryDate: string) => void;
};

const Meals: React.FC<MealsProps> = ({ displayDate, setDisplayDate, queryDate, setQueryDate }) => {
    const { consumer, setConsumer } = useContext(AuthContext);

    const navigate = useNavigate();

    const [selectedMeal, setSelectedMeal] = useState<null | string>(null);
    const [selectedId, setSelectedId] = useState<null | number>(null);
    const [addMealModalIsOpen, setAddMealModalIsOpen] = useState<boolean>(false);
    const [updateMealModalIsOpen, setUpdateMealModalIsOpen] = useState<boolean>(false);

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
        const getDailyMeals = async () => {
            try {
                const response = await fetch(
                    'http://localhost:5000/api/v1/nutrition/getDailyMeals',
                    {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ date: queryDate })
                    }
                );

                if (response.ok) {
                    const meals = await response.json();

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
                                if (meals[i].calorie) {
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

        getDailyMeals();
    }, [consumer.authenticated, queryDate]);

    const getOtherDate = (direction: string) => {
        if (displayDate) {
            // parse MM/DD/YYYY string into a Date object //
            let currentDate = new Date(displayDate);

            // subtract or add one day //
            if (direction === 'left') {
                currentDate.setDate(currentDate.getDate() - 1);
            }
            else if (direction === 'right') {
                currentDate.setDate(currentDate.getDate() + 1);
            }

            // extract date components //
            const previousMonth = currentDate.getMonth() + 1;
            const previousDay = currentDate.getDate();
            const previousYear = currentDate.getFullYear();

            // update dates //
            setDisplayDate(`${previousMonth}/${previousDay}/${previousYear}`);
            setQueryDate(`${previousYear}-${previousMonth}-${previousDay}`);
        }
    }

    const openAddMealModal = (meal:string) => {
        setAddMealModalIsOpen(true);
        setSelectedMeal(meal);
    }

    const closeAddMealModal = () => {
        setAddMealModalIsOpen(false);
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

    const openUpdateMealModal = (meal: string, id: number) => {
        setUpdateMealModalIsOpen(true);
        setSelectedMeal(meal);
        setSelectedId(id);

        // find meal by id //
        let mealToBeUpdated: MealDataTypes | undefined = undefined;
        switch (meal) {
            case 'breakfast':
                mealToBeUpdated = breakfasts.find((breakfast) => breakfast.id === id);
                break;
            case 'lunch':
                mealToBeUpdated = lunches.find((lunch) => lunch.id === id);
                break;
            case 'dinner':
                mealToBeUpdated = dinners.find((dinner) => dinner.id === id);
                break;
            case 'snack':
                mealToBeUpdated = snacks.find((snack) => snack.id === id);
                break;
        }

        if (mealToBeUpdated) {
            // convert consumedAt format from 2023-11-16T21:34:00.000Z to 2023-11-16T15:45 (just for the form input) //
            const date = new Date(mealToBeUpdated.consumedAt);
            date.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
            const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

            setFormData({
                name: mealToBeUpdated.name,
                calorie: (mealToBeUpdated.calorie ? mealToBeUpdated.calorie.toString() : ''),
                fat: (mealToBeUpdated.fat ? mealToBeUpdated.fat.toString() : ''),
                cholesterol: (mealToBeUpdated.cholesterol ? mealToBeUpdated.cholesterol.toString() : ''),
                sodium: (mealToBeUpdated.sodium ? mealToBeUpdated.sodium.toString() : ''),
                carbohydrate: (mealToBeUpdated.carbohydrate ? mealToBeUpdated.carbohydrate.toString() : ''),
                protein: (mealToBeUpdated.protein ? mealToBeUpdated.protein.toString() : ''),
                consumedAt: formattedDate
            });
        }
    }

    const closeUpdateMealModal = () => {
        setUpdateMealModalIsOpen(false);
        setSelectedMeal(null);
        setSelectedId(null);
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

    const validateFormData = () => {
        const isIntegerString = (str: string) => {
            return /^\d+$/.test(str);
        }

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

    const addMeal = async (e: React.FormEvent<HTMLFormElement>) => {
        // prevent screen refresh //
        e.preventDefault();

        if (validateFormData()) {
            try {
                const updatedFormData = {
                    ...formData,
                    mealType: selectedMeal
                };

                const response = await fetch(
                    `http://localhost:5000/api/v1/nutrition/addMeal`,
                    {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedFormData)
                    }
                );
                if (response.ok) {
                    const newMeal = await response.json();

                    switch(selectedMeal) {
                        case 'breakfast':
                            setBreakfasts((prevBreakfasts) => [...prevBreakfasts, newMeal]);
                            setSumBreakfasts({
                                calorie: sumBreakfasts.calorie + (newMeal.calorie || 0),
                                fat: sumBreakfasts.fat + (newMeal.fat || 0),
                                cholesterol: sumBreakfasts.cholesterol + (newMeal.cholesterol || 0),
                                sodium: sumBreakfasts.sodium + (newMeal.sodium || 0),
                                carbohydrate: sumBreakfasts.carbohydrate + (newMeal.carbohydrate || 0),
                                protein: sumBreakfasts.protein + (newMeal.protein || 0)
                            });
                            break;
                        case 'lunch':
                            setLunches((prevLunches) => [...prevLunches, newMeal]);
                            setSumLunches({
                                calorie: sumLunches.calorie + (newMeal.calorie || 0),
                                fat: sumLunches.fat + (newMeal.fat || 0),
                                cholesterol: sumLunches.cholesterol + (newMeal.cholesterol || 0),
                                sodium: sumLunches.sodium + (newMeal.sodium || 0),
                                carbohydrate: sumLunches.carbohydrate + (newMeal.carbohydrate || 0),
                                protein: sumLunches.protein + (newMeal.protein || 0)
                            });
                            break;
                        case 'dinner':
                            setDinners((prevDinners) => [...prevDinners, newMeal]);
                            setSumDinners({
                                calorie: sumDinners.calorie + (newMeal.calorie || 0),
                                fat: sumDinners.fat + (newMeal.fat || 0),
                                cholesterol: sumDinners.cholesterol + (newMeal.cholesterol || 0),
                                sodium: sumDinners.sodium + (newMeal.sodium || 0),
                                carbohydrate: sumDinners.carbohydrate + (newMeal.carbohydrate || 0),
                                protein: sumDinners.protein + (newMeal.protein || 0)
                            });
                            break;
                        case 'snack':
                            setSnacks((prevSnacks) => [...prevSnacks, newMeal]);
                            setSumSnacks({
                                calorie: sumSnacks.calorie + (newMeal.calorie || 0),
                                fat: sumSnacks.fat + (newMeal.fat || 0),
                                cholesterol: sumSnacks.cholesterol + (newMeal.cholesterol || 0),
                                sodium: sumSnacks.sodium + (newMeal.sodium || 0),
                                carbohydrate: sumSnacks.carbohydrate + (newMeal.carbohydrate || 0),
                                protein: sumSnacks.protein + (newMeal.protein || 0)
                            })
                            break;
                    }

                    setSumMeals({
                        calorie: sumMeals.calorie + (newMeal.calorie || 0),
                        fat: sumMeals.fat + (newMeal.fat || 0),
                        cholesterol: sumMeals.cholesterol + (newMeal.cholesterol || 0),
                        sodium: sumMeals.sodium + (newMeal.sodium || 0),
                        carbohydrate: sumMeals.carbohydrate + (newMeal.carbohydrate || 0),
                        protein: sumMeals.protein + (newMeal.protein || 0)
                    });

                    closeAddMealModal();
                }
                else {
                    const error = await response.json();
                    alert(error);
                }   
            }
            catch (err) {
                console.log(`Add meal error: ${err}`);
            }
        }
    }

    const updateMeal = async (e: React.FormEvent<HTMLFormElement>) => {
        // prevent screen refresh //
        e.preventDefault();

        if (validateFormData()) {
            try {
                const updatedFormData = {
                    ...formData,
                    id: selectedId,
                    mealType: selectedMeal
                };

                const response = await fetch(
                    `http://localhost:5000/api/v1/nutrition/updateMeal`,
                    {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedFormData)
                    }
                );
                if (response.ok) {
                    const updatedMeal = await response.json();

                    switch(selectedMeal) {
                        case 'breakfast':
                            // find breakfast by id //
                            const breakfastToBeUpdated: MealDataTypes | undefined = breakfasts.find(
                                (breakfast) => breakfast.id === selectedId
                            );

                            if (breakfastToBeUpdated) {
                                // subtract old values & add new values //
                                setSumBreakfasts((prevSumBreakfasts) => ({
                                    calorie: prevSumBreakfasts.calorie - (breakfastToBeUpdated.calorie || 0) + (updatedMeal.calorie || 0),
                                    fat: prevSumBreakfasts.fat - (breakfastToBeUpdated.fat || 0) + (updatedMeal.fat || 0),
                                    cholesterol: prevSumBreakfasts.cholesterol - (breakfastToBeUpdated.cholesterol || 0) + (updatedMeal.cholesterol || 0),
                                    sodium: prevSumBreakfasts.sodium - (breakfastToBeUpdated.sodium || 0) + (updatedMeal.sodium || 0),
                                    carbohydrate: prevSumBreakfasts.carbohydrate - (breakfastToBeUpdated.carbohydrate || 0) + (updatedMeal.carbohydrate || 0),
                                    protein: prevSumBreakfasts.protein - (breakfastToBeUpdated.protein || 0) + (updatedMeal.protein || 0)
                                }));

                                setSumMeals((prevSum) => ({
                                    calorie: prevSum.calorie - (breakfastToBeUpdated.calorie || 0) + (updatedMeal.calorie || 0),
                                    fat: prevSum.fat - (breakfastToBeUpdated.fat || 0) + (updatedMeal.fat || 0),
                                    cholesterol: prevSum.cholesterol - (breakfastToBeUpdated.cholesterol || 0) + (updatedMeal.cholesterol || 0),
                                    sodium: prevSum.sodium - (breakfastToBeUpdated.sodium || 0) + (updatedMeal.sodium || 0),
                                    carbohydrate: prevSum.carbohydrate - (breakfastToBeUpdated.carbohydrate || 0) + (updatedMeal.carbohydrate || 0),
                                    protein: prevSum.protein - (breakfastToBeUpdated.protein || 0) + (updatedMeal.protein || 0)
                                }));
                            }

                            // update breakfasts //
                            const updatedBreakfasts = breakfasts.map(breakfast => {
                                return breakfast.id === selectedId ? { ...breakfast, ...updatedMeal } : breakfast;
                            });
                            setBreakfasts(updatedBreakfasts);

                            break;
                        case 'lunch':
                            // find lunch by id //
                            const lunchToBeUpdated: MealDataTypes | undefined = lunches.find(
                                (lunch) => lunch.id === selectedId
                            );

                            if (lunchToBeUpdated) {
                                // subtract old values & add new values //
                                setSumLunches((prevSumLunches) => ({
                                    calorie: prevSumLunches.calorie - (lunchToBeUpdated.calorie || 0) + (updatedMeal.calorie || 0),
                                    fat: prevSumLunches.fat - (lunchToBeUpdated.fat || 0) + (updatedMeal.fat || 0),
                                    cholesterol: prevSumLunches.cholesterol - (lunchToBeUpdated.cholesterol || 0) + (updatedMeal.cholesterol || 0),
                                    sodium: prevSumLunches.sodium - (lunchToBeUpdated.sodium || 0) + (updatedMeal.sodium || 0),
                                    carbohydrate: prevSumLunches.carbohydrate - (lunchToBeUpdated.carbohydrate || 0) + (updatedMeal.carbohydrate || 0),
                                    protein: prevSumLunches.protein - (lunchToBeUpdated.protein || 0) + (updatedMeal.protein || 0)
                                }));

                                setSumMeals((prevSum) => ({
                                    calorie: prevSum.calorie - (lunchToBeUpdated.calorie || 0) + (updatedMeal.calorie || 0),
                                    fat: prevSum.fat - (lunchToBeUpdated.fat || 0) + (updatedMeal.fat || 0),
                                    cholesterol: prevSum.cholesterol - (lunchToBeUpdated.cholesterol || 0) + (updatedMeal.cholesterol || 0),
                                    sodium: prevSum.sodium - (lunchToBeUpdated.sodium || 0) + (updatedMeal.sodium || 0),
                                    carbohydrate: prevSum.carbohydrate - (lunchToBeUpdated.carbohydrate || 0) + (updatedMeal.carbohydrate || 0),
                                    protein: prevSum.protein - (lunchToBeUpdated.protein || 0) + (updatedMeal.protein || 0)
                                }));
                            }

                            // update lunches //
                            const updatedLunches = lunches.map(lunch => {
                                return lunch.id === selectedId ? { ...lunch, ...updatedMeal } : lunch;
                            });
                            setLunches(updatedLunches);

                            break;
                        case 'dinner':
                            // find dinner by id //
                            const dinnerToBeUpdated: MealDataTypes | undefined = dinners.find(
                                (dinner) => dinner.id === selectedId
                            );

                            if (dinnerToBeUpdated) {
                                // subtract old values & add new values //
                                setSumDinners((prevSumDinners) => ({
                                    calorie: prevSumDinners.calorie - (dinnerToBeUpdated.calorie || 0) + (updatedMeal.calorie || 0),
                                    fat: prevSumDinners.fat - (dinnerToBeUpdated.fat || 0) + (updatedMeal.fat || 0),
                                    cholesterol: prevSumDinners.cholesterol - (dinnerToBeUpdated.cholesterol || 0) + (updatedMeal.cholesterol || 0),
                                    sodium: prevSumDinners.sodium - (dinnerToBeUpdated.sodium || 0) + (updatedMeal.sodium || 0),
                                    carbohydrate: prevSumDinners.carbohydrate - (dinnerToBeUpdated.carbohydrate || 0) + (updatedMeal.carbohydrate || 0),
                                    protein: prevSumDinners.protein - (dinnerToBeUpdated.protein || 0) + (updatedMeal.protein || 0)
                                }));

                                setSumMeals((prevSum) => ({
                                    calorie: prevSum.calorie - (dinnerToBeUpdated.calorie || 0) + (updatedMeal.calorie || 0),
                                    fat: prevSum.fat - (dinnerToBeUpdated.fat || 0) + (updatedMeal.fat || 0),
                                    cholesterol: prevSum.cholesterol - (dinnerToBeUpdated.cholesterol || 0) + (updatedMeal.cholesterol || 0),
                                    sodium: prevSum.sodium - (dinnerToBeUpdated.sodium || 0) + (updatedMeal.sodium || 0),
                                    carbohydrate: prevSum.carbohydrate - (dinnerToBeUpdated.carbohydrate || 0) + (updatedMeal.carbohydrate || 0),
                                    protein: prevSum.protein - (dinnerToBeUpdated.protein || 0) + (updatedMeal.protein || 0)
                                }));
                            }

                            // update dinners //
                            const updatedDinners = dinners.map(dinner => {
                                return dinner.id === selectedId ? { ...dinner, ...updatedMeal } : dinner;
                            });
                            setDinners(updatedDinners);

                            break;
                        case 'snack':
                            // find snack by id //
                            const snackToBeUpdated: MealDataTypes | undefined = snacks.find(
                                (snack) => snack.id === selectedId
                            );

                            if (snackToBeUpdated) {
                                // subtract old values & add new values //
                                setSumSnacks((prevSumSnacks) => ({
                                    calorie: prevSumSnacks.calorie - (snackToBeUpdated.calorie || 0) + (updatedMeal.calorie || 0),
                                    fat: prevSumSnacks.fat - (snackToBeUpdated.fat || 0) + (updatedMeal.fat || 0),
                                    cholesterol: prevSumSnacks.cholesterol - (snackToBeUpdated.cholesterol || 0) + (updatedMeal.cholesterol || 0),
                                    sodium: prevSumSnacks.sodium - (snackToBeUpdated.sodium || 0) + (updatedMeal.sodium || 0),
                                    carbohydrate: prevSumSnacks.carbohydrate - (snackToBeUpdated.carbohydrate || 0) + (updatedMeal.carbohydrate || 0),
                                    protein: prevSumSnacks.protein - (snackToBeUpdated.protein || 0) + (updatedMeal.protein || 0)
                                }));

                                setSumMeals((prevSum) => ({
                                    calorie: prevSum.calorie - (snackToBeUpdated.calorie || 0) + (updatedMeal.calorie || 0),
                                    fat: prevSum.fat - (snackToBeUpdated.fat || 0) + (updatedMeal.fat || 0),
                                    cholesterol: prevSum.cholesterol - (snackToBeUpdated.cholesterol || 0) + (updatedMeal.cholesterol || 0),
                                    sodium: prevSum.sodium - (snackToBeUpdated.sodium || 0) + (updatedMeal.sodium || 0),
                                    carbohydrate: prevSum.carbohydrate - (snackToBeUpdated.carbohydrate || 0) + (updatedMeal.carbohydrate || 0),
                                    protein: prevSum.protein - (snackToBeUpdated.protein || 0) + (updatedMeal.protein || 0)
                                }));
                            }

                            // update snacks //
                            const updatedSnacks = snacks.map(snack => {
                                return snack.id === selectedId ? { ...snack, ...updatedMeal } : snack;
                            });
                            setSnacks(updatedSnacks);

                            break;
                    }

                    closeUpdateMealModal();
                }
                else {
                    const error = await response.json();
                    alert(error);
                }   
            }
            catch (err) {
                console.log(`Update meal error: ${err}`);
            }
        }
    }

    const deleteMeal = async (id: number, mealType: string) => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/v1/nutrition/deleteMeal`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id, mealType })
                }
            );

            if (response.ok) {
                switch (mealType) {
                    case 'breakfast':
                        // find breakfast by id //
                        const breakfastToBeRemoved: MealDataTypes | undefined = breakfasts.find(
                            (breakfast) => breakfast.id === id
                        );

                        // update sum of all breakfasts & sum of all meals //
                        if (breakfastToBeRemoved) {
                            setSumBreakfasts((prevSum) => ({
                                calorie: prevSum.calorie - (breakfastToBeRemoved.calorie || 0),
                                fat: prevSum.fat - (breakfastToBeRemoved.fat || 0),
                                cholesterol: prevSum.cholesterol - (breakfastToBeRemoved.cholesterol || 0),
                                sodium: prevSum.sodium - (breakfastToBeRemoved.sodium || 0),
                                carbohydrate: prevSum.carbohydrate - (breakfastToBeRemoved.carbohydrate || 0),
                                protein: prevSum.protein - (breakfastToBeRemoved.protein || 0)
                            }));

                            setSumMeals((prevSum) => ({
                                calorie: prevSum.calorie - (breakfastToBeRemoved.calorie || 0),
                                fat: prevSum.fat - (breakfastToBeRemoved.fat || 0),
                                cholesterol: prevSum.cholesterol - (breakfastToBeRemoved.cholesterol || 0),
                                sodium: prevSum.sodium - (breakfastToBeRemoved.sodium || 0),
                                carbohydrate: prevSum.carbohydrate - (breakfastToBeRemoved.carbohydrate || 0),
                                protein: prevSum.protein - (breakfastToBeRemoved.protein || 0)
                            }));
                        }

                        // remove breakfast from breakfasts //
                        setBreakfasts((prevBreakfasts) => {
                            return prevBreakfasts.filter((breakfast) => breakfast.id !== id);
                        });
                        break;
                    case 'lunch':
                        // find lunch by id //
                        const lunchToBeRemoved: MealDataTypes | undefined = lunches.find(
                            (lunch) => lunch.id === id
                        );

                        // update sum of all lunches & sum of all meals //
                        if (lunchToBeRemoved) {
                            setSumLunches((prevSum) => ({
                                calorie: prevSum.calorie - (lunchToBeRemoved.calorie || 0),
                                fat: prevSum.fat - (lunchToBeRemoved.fat || 0),
                                cholesterol: prevSum.cholesterol - (lunchToBeRemoved.cholesterol || 0),
                                sodium: prevSum.sodium - (lunchToBeRemoved.sodium || 0),
                                carbohydrate: prevSum.carbohydrate - (lunchToBeRemoved.carbohydrate || 0),
                                protein: prevSum.protein - (lunchToBeRemoved.protein || 0)
                            }));

                            setSumMeals((prevSum) => ({
                                calorie: prevSum.calorie - (lunchToBeRemoved.calorie || 0),
                                fat: prevSum.fat - (lunchToBeRemoved.fat || 0),
                                cholesterol: prevSum.cholesterol - (lunchToBeRemoved.cholesterol || 0),
                                sodium: prevSum.sodium - (lunchToBeRemoved.sodium || 0),
                                carbohydrate: prevSum.carbohydrate - (lunchToBeRemoved.carbohydrate || 0),
                                protein: prevSum.protein - (lunchToBeRemoved.protein || 0)
                            }));
                        }

                        // remove lunch from lunches //
                        setLunches((prevLunches) => {
                            return prevLunches.filter((lunch) => lunch.id !== id);
                        });
                        break;
                    case 'dinner':
                        // find dinner by id //
                        const dinnerToBeRemoved: MealDataTypes | undefined = dinners.find(
                            (dinner) => dinner.id === id
                        );

                        // update sum of all dinners & sum of all meals //
                        if (dinnerToBeRemoved) {
                            setSumDinners((prevSum) => ({
                                calorie: prevSum.calorie - (dinnerToBeRemoved.calorie || 0),
                                fat: prevSum.fat - (dinnerToBeRemoved.fat || 0),
                                cholesterol: prevSum.cholesterol - (dinnerToBeRemoved.cholesterol || 0),
                                sodium: prevSum.sodium - (dinnerToBeRemoved.sodium || 0),
                                carbohydrate: prevSum.carbohydrate - (dinnerToBeRemoved.carbohydrate || 0),
                                protein: prevSum.protein - (dinnerToBeRemoved.protein || 0)
                            }));

                            setSumMeals((prevSum) => ({
                                calorie: prevSum.calorie - (dinnerToBeRemoved.calorie || 0),
                                fat: prevSum.fat - (dinnerToBeRemoved.fat || 0),
                                cholesterol: prevSum.cholesterol - (dinnerToBeRemoved.cholesterol || 0),
                                sodium: prevSum.sodium - (dinnerToBeRemoved.sodium || 0),
                                carbohydrate: prevSum.carbohydrate - (dinnerToBeRemoved.carbohydrate || 0),
                                protein: prevSum.protein - (dinnerToBeRemoved.protein || 0)
                            }));
                        }

                        // remove dinner from dinners //
                        setDinners((prevDinners) => {
                            return prevDinners.filter((dinner) => dinner.id !== id);
                        });
                        break;
                    case 'snack':
                        // find snack by id //
                        const snackToBeRemoved: MealDataTypes | undefined = snacks.find(
                            (snack) => snack.id === id
                        );

                        // update sum of all snacks & sum of all meals //
                        if (snackToBeRemoved) {
                            setSumSnacks((prevSum) => ({
                                calorie: prevSum.calorie - (snackToBeRemoved.calorie || 0),
                                fat: prevSum.fat - (snackToBeRemoved.fat || 0),
                                cholesterol: prevSum.cholesterol - (snackToBeRemoved.cholesterol || 0),
                                sodium: prevSum.sodium - (snackToBeRemoved.sodium || 0),
                                carbohydrate: prevSum.carbohydrate - (snackToBeRemoved.carbohydrate || 0),
                                protein: prevSum.protein - (snackToBeRemoved.protein || 0)
                            }));

                            setSumMeals((prevSum) => ({
                                calorie: prevSum.calorie - (snackToBeRemoved.calorie || 0),
                                fat: prevSum.fat - (snackToBeRemoved.fat || 0),
                                cholesterol: prevSum.cholesterol - (snackToBeRemoved.cholesterol || 0),
                                sodium: prevSum.sodium - (snackToBeRemoved.sodium || 0),
                                carbohydrate: prevSum.carbohydrate - (snackToBeRemoved.carbohydrate || 0),
                                protein: prevSum.protein - (snackToBeRemoved.protein || 0)
                            }));
                        }

                        // remove snack from snacks //
                        setSnacks((prevSnacks) => {
                            return prevSnacks.filter((snack) => snack.id !== id);
                        });
                        break;
                }    
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

    return (
        <Container>
            <div id='date-div'>
                <button onClick={() => {
                    getOtherDate('left')
                }}>
                    <StyledFaArrowLeft />
                </button>
                <h1>{displayDate}</h1>
                <button onClick={() => {
                    getOtherDate('right')
                }}>
                    <StyledFaArrowRight />
                </button>
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
                                    <th className='th9' scope='col'></th>
                                    <th className='th10' scope='col'></th>
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
                                        <td className='td9'>
                                            <button onClick={() => {
                                                openUpdateMealModal('breakfast', breakfast.id)
                                            }}>
                                                Edit
                                            </button>
                                        </td>
                                        <td className='td10'>
                                            <button onClick={() => {
                                                deleteMeal(breakfast.id, breakfast.mealType)
                                            }}>
                                                Delete
                                            </button>
                                        </td>
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
                                    <td className='tf10'></td>
                                </tr>
                            </tfoot>
                        </table>
                    )
                }
                <button className='add-meal-btn' onClick={() => {
                    openAddMealModal('breakfast')
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
                                    <th className='th9' scope='col'></th>
                                    <th className='th10' scope='col'></th>
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
                                        <td className='td9'>
                                            <button onClick={() => {
                                                openUpdateMealModal('lunch', lunch.id)
                                            }}>
                                                Edit
                                            </button>
                                        </td>
                                        <td className='td10'>
                                            <button onClick={() => {
                                                deleteMeal(lunch.id, lunch.mealType)
                                            }}>
                                                Delete
                                            </button>
                                        </td>
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
                                    <td className='tf10'></td>
                                </tr>
                            </tfoot>
                        </table>
                    )
                }
                <button className='add-meal-btn' onClick={() => {
                    openAddMealModal('lunch')
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
                                    <th className='th9' scope='col'></th>
                                    <th className='th10' scope='col'></th>
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
                                        <td className='td9'>
                                            <button onClick={() => {
                                                openUpdateMealModal('dinner', dinner.id)
                                            }}>
                                                Edit
                                            </button>
                                        </td>
                                        <td className='td10'>
                                            <button onClick={() => {
                                                deleteMeal(dinner.id, dinner.mealType)
                                            }}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th className='tf1' scope='row'>Totals</th>
                                    <td className='tf2'>{sumDinners.calorie}</td>
                                    <td className='tf3'>{sumDinners.fat}g</td>
                                    <td className='tf4'>{sumDinners.cholesterol}mg</td>
                                    <td className='tf5'>{sumDinners.sodium}mg</td>
                                    <td className='tf6'>{sumDinners.carbohydrate}g</td>
                                    <td className='tf7'>{sumDinners.protein}g</td>
                                    <td className='tf8'></td>
                                    <td className='tf9'></td>
                                    <td className='tf10'></td>
                                </tr>
                            </tfoot>
                        </table>
                    )
                }
                <button className='add-meal-btn' onClick={() => {
                    openAddMealModal('dinner')
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
                                    <th className='th9' scope='col'></th>
                                    <th className='th10' scope='col'></th>
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
                                        <td className='td9'>
                                            <button onClick={() => {
                                                openUpdateMealModal('snack', snack.id)
                                            }}>
                                                Edit
                                            </button>
                                        </td>
                                        <td className='td10'>
                                            <button onClick={() => {
                                                deleteMeal(snack.id, snack.mealType)
                                            }}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th className='tf1' scope='row'>Totals</th>
                                    <td className='tf2'>{sumSnacks.calorie}</td>
                                    <td className='tf3'>{sumSnacks.fat}g</td>
                                    <td className='tf4'>{sumSnacks.cholesterol}mg</td>
                                    <td className='tf5'>{sumSnacks.sodium}mg</td>
                                    <td className='tf6'>{sumSnacks.carbohydrate}g</td>
                                    <td className='tf7'>{sumSnacks.protein}g</td>
                                    <td className='tf8'></td>
                                    <td className='tf9'></td>
                                    <td className='tf10'></td>
                                </tr>
                            </tfoot>
                        </table>
                    )
                }
                <button className='add-meal-btn' onClick={() => {
                    openAddMealModal('snack')
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
                            <td id='ttd2'>{sumMeals.fat === null ? '0' : sumMeals.fat}g</td>
                            <td id='ttd3'>{sumMeals.cholesterol === null ? '0' : sumMeals.cholesterol}mg</td>
                            <td id='ttd4'>{sumMeals.sodium === null ? '0' : sumMeals.sodium}mg</td>
                            <td id='ttd5'>{sumMeals.carbohydrate === null ? '0' : sumMeals.carbohydrate}g</td>
                            <td id='ttd6'>{sumMeals.protein === null ? '0' : sumMeals.protein}g</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <br />

            <AddMealModal
                isOpen={addMealModalIsOpen}
                onRequestClose={closeAddMealModal}
                contentLabel='Modal'
            >
                <div id='content-modal-div'>
                    <button id='modal-exit-btn' onClick={closeAddMealModal}><StyledFaXmark /></button>
                    <h1>{ selectedMeal && (selectedMeal.charAt(0).toUpperCase() + selectedMeal.slice(1)) }</h1>

                    <form onSubmit={addMeal} autoComplete='off'>
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
                            <label htmlFor='meal-fat'><b>Fat:</b> (grams)</label>
                            <input
                                id='meal-fat'
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
                            <label htmlFor='meal-carbohydrate'><b>Carbohydrate:</b> (grams)</label>
                            <input
                                id='meal-carbohydrate'
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
            </AddMealModal>

            <UpdateMealModal
                isOpen={updateMealModalIsOpen}
                onRequestClose={closeUpdateMealModal}
                contentLabel='Modal'
            >
                <div id='content-modal-div'>
                    <button id='modal-exit-btn' onClick={closeUpdateMealModal}><StyledFaXmark /></button>
                    <h1>{ selectedMeal && (selectedMeal.charAt(0).toUpperCase() + selectedMeal.slice(1)) }</h1>

                    <form onSubmit={updateMeal} autoComplete='off'>
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
                            <label htmlFor='meal-fat'><b>Fat:</b> (grams)</label>
                            <input
                                id='meal-fat'
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
                            <label htmlFor='meal-carbohydrate'><b>Carbohydrate:</b> (grams)</label>
                            <input
                                id='meal-carbohydrate'
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
            </UpdateMealModal>
        </Container>
    );
}
export default Meals;

const AddMealModal = styled(Modal)`
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
                    border: 3px solid #4484CE;
                    border-radius: 10px;
                }
            }
            
            button {
                margin: 0 auto;
                width: 225px;
                cursor: pointer;
                font-weight: bold;
                background-color: white;
                border: 3px solid green;
                border-radius: 10px;
            }
        }
    }
`;
const UpdateMealModal = styled(Modal)`
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
                    border: 3px solid #4484CE;
                    border-radius: 10px;
                }
            }
            
            button {
                margin: 0 auto;
                width: 225px;
                cursor: pointer;
                font-weight: bold;
                background-color: white;
                border: 3px solid green;
                border-radius: 10px;
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