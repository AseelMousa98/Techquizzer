function Question({ question, dispatch, answerIndex, questionNumbers }) {
  console.log(question); // Filter out null values from the answers before mapping
  const filteredAnswers = Object.values(question.answers).filter(
    (answer) => answer !== null
  );
  const hasAnswered = answerIndex != null;
  return (
    <div className="question">
      <h4>{question.question}</h4>

      <div className="options">
        {Object.values(filteredAnswers).map((answer, index) => (
          <button
            className={`btn btn-option ${
              hasAnswered
                ? index === question.correct_answer_index
                  ? "correct"
                  : "incorrect"
                : ""
            } ${hasAnswered ? (index === answerIndex ? "answer" : "") : ""} `}
            disabled={hasAnswered}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}
export default Question;
