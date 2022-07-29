import React from 'react'
import Start from './Start'
import Quiz from './Quiz'
import { nanoid } from 'nanoid'
import { toBeInTheDOM } from '@testing-library/jest-dom/dist/matchers';

export default function App() {

    const [questions, setQuestions] = React.useState([]);
    const [answers, setAnswers] = React.useState([])
    const [started, setStarted] = React.useState(false);
    const [answersChecked, setAnswersChecked] = React.useState(false);
    const [newGame, setNewGame] = React.useState(false);
    const [score, setScore] = React.useState(0);

    React.useEffect(() => {

        fetch('https://opentdb.com/api.php?amount=5&category=13&difficulty=easy&type=multiple&encode=url3986')
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
        })}, [newGame]
    )


    function startQuiz() {
        setStarted(true);
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

    }

    
        return (
        !started ?

        <Start onClick = { startQuiz }/>

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