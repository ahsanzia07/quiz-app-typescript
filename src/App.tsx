import React ,{useState } from 'react';
import './App.css';
import QuestionCard from './components/Question';
import { fetchData ,Difficulty , QuestionState} from './components/Api';

const TOTAL_QUESTIONS=10;
type AnswerObject={
  question: string;
  answer: string;
  correct : boolean;
  correctAnswer: string;
}
function App() {
  
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
   const [number, setnumber] = useState(0)
  const [gameover, setgameover] = useState(true)
  const [agya, setagya] = useState("Quiz End")
 console.log(questions)
  // console.log(fetchData(TOTAL_QUESTIONS,Difficulty.EASY))

  const startQuiz=async ()=>{
    setLoading(true)
    setgameover(false) 
    const newQuestions= await fetchData(TOTAL_QUESTIONS, Difficulty.EASY)
     setQuestions(newQuestions);
     setScore(0);
     setUserAnswers([]);
     setnumber(0)
     setLoading(false)

  }
///next Question
  const nextOne=async ()=>{
    const nextQuestion =number +1;
    if (nextQuestion===TOTAL_QUESTIONS){
      
      setgameover(true);
      setagya("end")
      return <div> {agya} </div>
    }
    else {
      setnumber(nextQuestion)
    }
  }

  

  const checkAnswer=(e : React.MouseEvent<HTMLButtonElement>)=>{
     
    if (!gameover){
        const answer = e.currentTarget.value;

        const correct= questions[number].correct_answer===answer;
      if (correct) setScore(prev => prev +1)

      const answerObject={
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      
      setUserAnswers(prev => [...prev , answerObject])
      }
  };
  return (
    <div className="App">
    <div className="QUIZ_APP"> 
    <div className="div-card">
      {gameover || userAnswers.length===TOTAL_QUESTIONS ? (
  <button onClick={startQuiz}> Start Quiz </button>):null}{!gameover ?(
  <p className="score"> Score :{score} </p>):null }
  { loading ? (
  <p> Loading </p> ):null}
  {/* {
  console.log(questions)
  } */}
{
 !loading && !gameover ?(
<QuestionCard
questionNum={number+1}
totalQuestions={TOTAL_QUESTIONS}
question1={questions[number].question}
answers={questions[number].answers}
userAnswer={userAnswers ? userAnswers[number] : undefined}
callback={checkAnswer}

/> ):null }

{ !gameover && !loading &&  userAnswers.length === number+1 && number !==TOTAL_QUESTIONS -1 ?(
<button className="next-btn" onClick={nextOne}> Next </button>
):null }
    </div>    
    </div>
   
    </div>
  );
}

export default App;
