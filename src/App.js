import React from 'react'
import Quiz from './Quiz'
import { nanoid } from 'nanoid'
import { toBeInTheDOM } from '@testing-library/jest-dom/dist/matchers';

export default function App() {

    const [options, setOptions] = React.useState({
        numQuestions: 'choose',
        category: 'choose',
        difficulty: 'choose'
    })
    const [categoryCode, setCategoryCode] = React.useState('')
    const [isIncomplete, setIsIncomplete] = React.useState(false)
    const [incompleteMessage, setIncompleteMessage] = React.useState('')
    const [questions, setQuestions] = React.useState([]);
    const [answers, setAnswers] = React.useState([])
    const [started, setStarted] = React.useState(false);
    const [answersChecked, setAnswersChecked] = React.useState(false);
    const [newGame, setNewGame] = React.useState(false);
    const [score, setScore] = React.useState(0);
   

    React.useEffect(()=>{
        if(options.category === 'Film'){
            setCategoryCode('11')}
        else if(options.category === 'Music'){
            setCategoryCode('12')}
        else if(options.category === 'Science and Nature'){
            setCategoryCode('17')}
        else if(options.category === 'History'){
            setCategoryCode('23')
        } else if (options.category === 'Animals'){
            setCategoryCode('27')
        } else if (options.category === 'Celebrities'){
            setCategoryCode('26')
        }
    })

    function fetchAPIdata(url) {

        return fetch(url)
        .then(res => res.json())
        .then(data => {
            return setQuestions(() => data.results.map(item => {
                    return {
                        value: item.question,
                        id: nanoid(),
                        key: nanoid()
                    }
                })),
                setAnswers(() => data.results.map(item => {
                    const incorrectAnswersArray = item.incorrect_answers.map(item => ({
                        value: item,
                        id: nanoid(),
                        isHeld: false
                    }))
                    const correctAnswer = {
                        value: item.correct_answer,
                        id: nanoid(),
                        isHeld: false,
                        isCorrect: true
                    }
                    const randomIndex = Math.floor(Math.random() * 4)
                    const allAnswersArray = incorrectAnswersArray;
                    allAnswersArray.splice(randomIndex, 0, correctAnswer)
                    return allAnswersArray
                }))
        })}

      
        const urlBase = 'https://opentdb.com/api.php?'
        const amountKey = `amount=${options.numQuestions}`    
        const categoryKey = `&category=${categoryCode}`;
        const difficultyKey = `&difficulty=${options.difficulty.toLowerCase()}`
        const encodingKey = '&encode=url3986'
        const apiUrl = `${urlBase}${amountKey}${categoryKey}${difficultyKey}${encodingKey}`;

        function handleSubmit (){
            
            if(options.numQuestions === 'choose') {
                setIsIncomplete(true)
                setIncompleteMessage('Please choose the number of questions')}
            else if (options.category === 'choose') {
                setIsIncomplete(true)
                setIncompleteMessage('Please choose a category')}
            else if (options.difficulty === 'choose') {
                setIsIncomplete(true)
                setIncompleteMessage('Please choose a difficulty level')}
            else{
                    setStarted(true);
                    fetchAPIdata(apiUrl)}
            
        
        }

    function handleChange(e){
        setOptions(prevOptions =>{
            return {
                ...prevOptions,
                [e.target.name]: e.target.value
            }
        })
    }

    function handleClick(e) {

    setAnswers(prevAnswers => prevAnswers.map(arr => {
        const targetItem = arr.find(item => item.id === e.target.id)
        if(arr.includes(targetItem)){
            return arr.map(obj => {
            if (e.target.id === obj.id){
                return Object.assign({...obj, isHeld: !obj.isHeld})
            }
            else {
                return Object.assign({...obj, isHeld: false})
            }})}
            else {
                return arr
    }}))}

    function checkAnswers () {
        setAnswersChecked(true)
        answers.map(arr => arr.map(obj=>{
            if (obj.isHeld && obj.isCorrect){
                setScore(prevScore => prevScore + 1)
            }
        }))
        }

    function playAgain(e){
        e.preventDefault();
        setNewGame(prevGame => !prevGame)
        setAnswersChecked(false)
        fetchAPIdata(apiUrl);
    }

        return (
        
            !started ?

        <div className='start-container'>
            <h1>Quizzical Trivia Game</h1>
            <p className='quiz-description'>Test your knowledge with randomly generated trivia questions!</p>
        
        <div className='form-container'>
            <label htmlFor='numQuestions'>Questions</label>
                <select 
                    id='numQuestions' 
                    value={options.numQuestions}
                    onChange={handleChange}
                    name='numQuestions'>
                    <option>Choose</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                </select>

            <label htmlFor='category'>Category</label>
                <select 
                id='category' 
                value={options.category}
                onChange={handleChange}
                name='category'>
                    <option>Choose</option>
                    <option>Film</option>
                    <option>Music</option>
                    <option>Science and Nature</option>
                    <option>History</option>
                    <option>Animals</option>
                    <option>Celebrities</option>
                </select>

                <label htmlFor='difficulty'>Difficulty</label>
                    <select 
                    id='difficulty' 
                    value={options.difficulty}
                    onChange={handleChange}
                    name='difficulty'>
                        <option>Choose</option>
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>
    </div>

        {isIncomplete && 
            <div className='incomplete-container'>
                 <p className='incomplete'>{incompleteMessage}</p>
            </div>}
        <div className='submit-container'>
            <button onClick={handleSubmit}>Submit</button>
        </div>
        
    </div>

        :


        <div>


        <Quiz 
        questions = { questions }
        answers = { answers }
        handleClick = {handleClick}
        checkAnswers = {checkAnswers}
        answersChecked = {answersChecked}
        playAgain={playAgain}
        score={score}
        />

        </div>
        
    )
}