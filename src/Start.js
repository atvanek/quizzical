import React from 'react'

export default function Start (props) {


    return (
        <div className='start-container'>
            <h1>Musical Quizzical Trivia</h1>
            <p className='quiz-description'>Test your knowledge of theatre and musicals with 5 randomly generated questions!</p>
            <button onClick={props.onClick}>Start quiz</button>
        </div>
    )
}