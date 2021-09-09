import React from 'react'

type Props ={
    question1 : string;
    answers : string[];
    callback : any ;
    userAnswer : any ;
    questionNum : number;
    totalQuestions : number;

}
const QuestionCard :React.FC<Props> = ({question1 , answers , callback,userAnswer,questionNum,totalQuestions}) => {
    return (
        <div>
           <p> Question : {questionNum}/{totalQuestions}</p>
               
            <b>    <p  className="div-question"  dangerouslySetInnerHTML={{ __html : question1}}/>
            </b>
          <div>
               {answers.map((answer)=>
           <div className="div-answer">
               <button className="div-answer-btn" value={answer} disabled={userAnswer} onClick={callback}> 
              <b> <span dangerouslySetInnerHTML={{ __html : answer}}/> 
              </b></button>
           </div>
           
           
           )}
           </div>
        </div>
    )
}

export default QuestionCard
