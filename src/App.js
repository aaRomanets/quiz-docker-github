import React from 'react';
import './index.scss';

//the structure of questions, possible answers to them and positive answer among these answers
const questions = [
  {
    //first question
    title: 'React - this ... ?',
    //variants of answer to first question
    variants: ['library', 'framework', 'application'],
    //positive answer to first question
    correct: 0,
  },
  {
    //second question
    title: 'Component - this ... ',
    //variants of answer to second question
    variants: ['application', 'part of an application or page', 'What I do not know what is'],
    //positive answer to second question
    correct: 1,
  },
  {
    //third question
    title: 'What is it JSX?',
    //variants of answer to third question
    variants: [
      'It is simple HTML',
      'It is function',
      'It is same Это тот же HTML, but with possibility to implement JS-code',
    ],
     //positive answer to third question
    correct: 2,
  }
]

//the function of showing the result of the game 
function Result({correct}) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" alt="something" />
      {/*Showing the number of correct answers */}
      <h2>
        You guessed it {correct} answer from {questions.length}
      </h2>
       {/*We provide an opportunity to restart the game */}
      <a href="/">
        <button>Try again</button>
      </a>
    </div>
  )
}

//the function of the game itself
function Game({step, question, onClickVariant}) 
{
  //we defining in percentage the quantity of game questions, which have already been answered
  const percentage = Math.round((step / questions.length) * 100);
  return (
    <>
      {/*we showing in percentage the quantity of game questions, which have already been answered */}
      <div className="progress">
        <div style={{width: `${percentage}%`}} className="progress__inner"></div>
      </div>
      {/*game question*/}
      <h1>{question.title}</h1>
      <ul>
        {
          //possible answers to the question of the game, you need to click on some of them
          question.variants.map((text, index) => (
          <li key={text} onClick={() => onClickVariant(index)}>
            {text}
          </li>
        ))}
      </ul>
    </>
  )
}


function App() {
  //status of the game stage number
  const [step, setStep]       = React.useState(0);
  //the state of the number of correct answers on question of game
  const [correct, setCorrect] = React.useState(0);
  //the question of the game according to step stage
  const question = questions[step];

  //the checking function of game process (is the correct answer given to the question of the game or not)
  const onClickVariant = (index) => {
    //we fixing the number of game step 
    setStep(step+1);

    if (index === question.correct) 
    {
      //we fixing the number of positive answers to game questions
      setCorrect(correct + 1);
    }
  }

  return (
    <div className="App">
      { step !== questions.length ?
      (
        //We showing the steps of game, if there is no answers on all questions
        <Game
          //the number of game step
          step={step}  
          //the game question according to it step
          question={question} 
          //the function of the game itself
          onClickVariant={onClickVariant}
        />
      )
      : 
      (
        //We showing the result of game itself
        <Result correct = {correct}/> 
      )}
    </div>
  );
}

export default App;