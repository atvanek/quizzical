import React from 'react'

export default function Start (props) {

    const [options, setOptions] = React.useState({
        numQuestions: '',
        category: '',
        difficulty: ''
    })

    const [categoryCode, setCategoryCode] = React.useState('')

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


    function handleChange(e){
        setOptions(prevOptions =>{
            return {
                ...prevOptions,
                [e.target.name]: e.target.value
            }
        })
    }

    function handleSubmit (){
    const urlBase = 'https://opentdb.com/api.php?'
    const amountKey = `amount=${options.numQuestions}`    
    const categoryKey = `&category=${categoryCode}`;
    const difficultyKey = `&difficulty=${options.difficulty.toLowerCase()}`
    const encodingKey = '&encode=url3986'
    const apiUrl = `${urlBase}${amountKey}${categoryKey}${difficultyKey}${encodingKey}`;

    console.log(apiUrl)
    
    }

    return (
        <div className='start-container'>
            <h1>Quizzical Trivia Game</h1>
            <p className='quiz-description'>Test your knowledge with randomly generated trivia questions!</p>
        
            <label htmlFor='numQuestions'>Number of questions</label>
                <select 
                    id='numQuestions' 
                    value={options.numQuestions}
                    onChange={handleChange}
                    name='numQuestions'>
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
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>

            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}