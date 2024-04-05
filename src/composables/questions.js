import { ref } from 'vue';
import axios from 'axios';

export const questions = ref(null);
export const answers = ref({});
export const corrects = ref();
export const validate = ref({});
export const resultStatus = ref(false);
export const right = ref();
export const wrong = ref();

export const getQuestions = async () => {
    try {
        const response = await axios.get('/questions.json'); 
        questions.value = response.data.questions;

        corrects.value = getCurrentAnswers(questions.value);
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
    }
};

const getCurrentAnswers = (questions) => {
    let resultObject = {};
  
    questions.forEach(question => {
        const result = {};
    
        question.options.forEach((option, index) => {
            if (question.correctAnswer.includes(option)) {
                result[index] = true;
            } else {
                result[index] = false;
            }
        });
    
        resultObject[question.id.toString()] = result;
    });
    
    return resultObject;
}

export const letValidate = () => {
    Object.keys(answers.value).forEach(questionId => {
        let flag = true;
        Object.values(answers.value[questionId]).forEach(answer => {
            if (answer === true) {
                flag = false;
                return;
            }
        });
        validate.value[questionId] = flag;
    });

    const allFalse = Object.values(validate.value).every(value => value === false);
    return allFalse;
};

export const checkAnswers = () => {
    const correctKeys = Object.keys(corrects.value);
    right.value = 0;
    wrong.value = 0;
  
    correctKeys.forEach(key => {
        const correctAnswer = corrects.value[key];
        const correctKeysSet = Object.keys(correctAnswer);
    
        const isWrong = correctKeysSet.some(k => {
            const correct = corrects.value[key][k];
            const noCorrect = answers.value[key][k];
    
            return correct !== noCorrect;
        });
    
        if (!isWrong) {
            right.value++;
        } else {
            wrong.value++;
        }
    });
    resultStatus.value = true;

    sendData();
};

const sendData = async () => {   
    const userData = JSON.parse(localStorage.getItem('userData'));
    const login = userData.login;

    const api = 'api'
    const url = `https://${api}/send.php`;

    try {
        const response = await axios.post(url, {
            login: login,
            right: right.value,
            wrong: wrong.value
        });
        console.log('Результат запроса:', response.data);
        if (response.data.success) {
            alert(response.data.message);
        } else {
            alert('Произошла ошибка: ' + response.data.message);
        } 
    } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
        alert('Произошла ошибка при отправке запроса');
    }
}