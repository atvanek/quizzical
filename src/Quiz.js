import React from 'react'

export default function Quiz(props) {

    const answersHTML = props.answers.map((arr) => {
        return arr.map(item => { 
            
            const answersHidden = {
                backgroundColor:  item.isHeld ?
                "#D6DBF5" : 
                "#ffffff"
            }

            const answersShown = {
                backgroundColor: item.isCorrect ? 
                "#94D7A2" : 
                item.isHeld ? 
                "#F8BCBC" :
                "#ffffff"
            }


            return ( 
                    <p  key = {item.key}
                        id = {item.id}
                        onClick = {!props.answersChecked ? (e) => props.handleClick(e, item.id): null}
                        className = 'answers'
                        style = {props.answersChecked ? answersShown : answersHidden}
                        > { decodeURIComponent(item.value)} 
                        
                    </p>
            )
        })
    });

    const questionComponents = props.questions.map((item, i) => {
            return ( 
                <div className = "question-container" >
                    <h3 
                    className='question-header'
                    key = {i} 
                    id = {item.id}> 
                    {decodeURIComponent(item.value)} </h3> 
                    <div className='answers-container'> 
                        {answersHTML[i] }
                    </div>
                        </div> 
                        )
                })


    return ( 
            <div className='quiz-container'>
                { questionComponents }
                {!props.answersChecked ? (
                <button className='check-answers' onClick={props.checkAnswers}> Check Answers </button>)
                :
                <div>
                <p>{props.score}</p>
                <button className='play-again' onClick={props.playAgain}> Play Again </button>
                </div>
            }
            </div>
                )
            }