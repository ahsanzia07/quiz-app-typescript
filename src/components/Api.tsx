import { array } from "yargs";
import { shuffleArray } from "../utilities";

 export const fetchData=async(amount :number , difficulty : Difficulty)=>{

    const apiData= `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
   
    const data= await ( await fetch (apiData)).json();

  return data.results.map((question : Question)=>(
      {
      ...question,
      answers: shuffleArray( [...question.incorrect_answers, question.correct_answer])
  }
  ))
}

export enum Difficulty{
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
} 
export type Question ={
    category : string 
 correct_answer : string
   difficulty :string
     incorrect_answers: string[]
      question : string
       type :string
       answer :string 
}

export type QuestionState= Question & {answers : string [];}