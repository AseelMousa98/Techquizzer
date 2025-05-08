import { useEffect, useReducer, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Error from "./Error";
import NextButton from "./NextButton";
import Progress from "./Progress";
import QuestionDetails from "./QuestionDetails";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import AnswersScreen from "./AnwersScreen";
const initialState = {
  fullQuestions: [],
  questions: [],
  status: "loading",
  index: 0,
  answerIndex: null,
  category: "select",
  difficulty: "select",
  points: 0,
  highscore: 0,
  secondsRemaining: 0,
  questionNumbers: 0,
  Answers: [],
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        fullQuestions: action.payload,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      const filterCategoryQuestions = state.fullQuestions.filter(
        (q) => q.category === state.category
      );
      const filterDifficultiesQuestions = filterCategoryQuestions.filter(
        (q) => q.difficulty === state.difficulty
      );
      const SEC_PER_QUESTION = 30;
      return {
        ...state,
        status: "active",
        secondsRemaining: filterDifficultiesQuestions.length * SEC_PER_QUESTION,
        questions: filterDifficultiesQuestions,
        questionNumbers: filterDifficultiesQuestions.length,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answerIndex: action.payload,
        points:
          action.payload === question.correct_answer_index
            ? state.points + 10
            : state.points,
        Answers: [
          ...state.Answers,
          {
            isCorrect: action.payload === question.correct_answer_index,
            question: question.question,
            correctAnswer:
              question.answers[
                `answer_${String.fromCharCode(
                  97 + question.correct_answer_index
                )}`
              ],
            yourAnswer:
              question.answers[
                `answer_${String.fromCharCode(97 + action.payload)}`
              ],

            questionIndex: state.index,
          },
        ],
      };

    case "filterCategoryQuestions":
      return {
        ...state,
        category: action.payload,
        index: 0, // Reset to first question when category changes
      };
    case "filterDifficultiesQuestions":
      return {
        ...state,
        difficulty: action.payload,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answerIndex: null,
      };
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restartQuiz":
      return {
        ...initialState,
        fullQuestions: state.fullQuestions,
        questions: state.fullQuestions,
        status: "ready",
        Answers: [],
        highscore: state.highscore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    case "CheckAnswers":
      return {
        ...state,
        status: "checked",
      };

    default:
      throw new Error("Action Unkown");
  }
}
export default function App() {
  const [
    {
      questions,
      status,
      index,
      answerIndex,
      category,
      difficulty,
      points,
      highscore,
      secondsRemaining,
      questionNumbers,
      Answers,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark-mode");
  };

  // const filterCategoryQuestions = questions.filter(
  //   (q) => q.category === category
  // );
  // const filterDifficultiesQuestions = filterCategoryQuestions.filter(
  //   (q) => q.difficulty === difficulty
  // );

  const maxPoints = questionNumbers * 10;

  useEffect(function () {
    fetch(`${process.env.https://quiz-api-4-1va2.onrender.com}/questions`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {isDarkMode ? "☀️" : "🌙"}
      </button>
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && (
          <Error message="There was an error fetching questions" />
        )}
        {status === "ready" && (
          <StartScreen
            questionNumbers={questionNumbers}
            dispatch={dispatch}
            questions={questions}
            category={category}
            difficulty={difficulty}
            secondsRemaining={secondsRemaining}
          />
        )}
        {status === "active" && (
          <>
            <h3>{questionNumbers} question to test your Knowledge</h3>
            <QuestionDetails question={questions[index]} />
            <Progress
              index={index}
              maxPoints={maxPoints}
              questionNumbers={questionNumbers}
              points={points}
              answerIndex={answerIndex}
            />

            <Question
              question={questions[index]}
              answerIndex={answerIndex}
              dispatch={dispatch}
              questionNumbers={questionNumbers}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answerIndex={answerIndex}
                index={index}
                questionNumbers={questionNumbers}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
        {status === "checked" && (
          <AnswersScreen Answers={Answers} dispatch={dispatch} />
        )}
      </Main>
    </div>
  );
}
