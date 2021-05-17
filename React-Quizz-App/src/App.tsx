import React, {useState} from 'react';
import {fetchQuizQuestions} from './API';  
import {QuestionState, Difficulty} from './API';

// Componentes
import QuestionCard from './components/QuestionCard';

// Estilos
import {GlobalStyle, Wrapper} from './App.styles';

// Tipos
export type AnswerObject = {
  question:string;
  answer:string;
  correct: boolean;
  correctAnswer:string;
}


const TOTAL_QUESTIONS = 10;

const App = () => {

  // Estados
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);


  // Funcion que se activa al iniciar la trivia
  // async porque hace la llamada a la API de trivias
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  // Funcion que checa las respuestas de las preguntas
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver){

      // Respuesta del usuario
      const answer = e.currentTarget.value;

      // Checamos la respuesta del usuario contra la respuesta correcta
      const correct = questions[number].correct_answer === answer;

      // Aumentamos la puntuacion si la respuesta es correcta
      if(correct)setScore(prev=>prev+1);

      // Guardamos la respuesta en el arreglo de respuestas del usuario
      const answerObject = {
        question: questions[number].question,
        answer: answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };

      setUserAnswers( (prev) => [...prev, answerObject]);
    }
  }

  // Funcion para cargar la siguiente pregunta
  const nextQuestion = () => {

    // Continuamos a la siguiente pregunta
    const nextQuestion = number+1;

    if(nextQuestion === TOTAL_QUESTIONS){
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  }

  return (
    <>
    <GlobalStyle/>
    <Wrapper className="App">

      <h1>Trivia hecha con React</h1>

      {gameOver || userAnswers.length===TOTAL_QUESTIONS ? (<button className="start" onClick={startTrivia}>Comenzar</button>):null}

      {!gameOver ?  <p className="score">Puntuacion:{score}</p> : null}

      {loading && <p>Cargando Preguntas ...</p>}

      {!loading && !gameOver &&(
              <QuestionCard
              questionNr = {number+1}
              totalQuestions={TOTAL_QUESTIONS}
              question={questions[number].question}
              answers={questions[number].answers}
              userAnswer={userAnswers?userAnswers[number]:undefined}
              callback={checkAnswer}
             />
      )}

      {!gameOver && !loading && userAnswers.length === number+1 && number !== TOTAL_QUESTIONS -1 ? (
        <button className="next" onClick={nextQuestion}>Siguiente Pregunta</button>
      ):null}

    </Wrapper>
    </>
  );
}

export default App;
