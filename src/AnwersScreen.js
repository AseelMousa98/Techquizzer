function AnswersScreen({ Answers, dispatch }) {
  console.log(Answers);
  return (
    <div className="asnwers-screen">
      <h1 className="answers"> Your Answers</h1>
      {Answers.map((Answer) => (
        <div
          className={`answer-card ${
            Answer.isCorrect ? "correct" : "incorrect"
          }`}
        >
          <p className="detail">
            <strong>Question {Answer.questionIndex + 1}</strong>:
            {Answer.question}
          </p>
          <div className="details">
            <p>CorrectAnswer :{Answer.correctAnswer}</p>
            <p>YourAnswer :{Answer.yourAnswer}</p>
          </div>
          <p>{Answer.isCorrect ? "✅ Correct" : "❌ Wrong"}</p>
        </div>
      ))}
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restartQuiz" })}
      >
        {" "}
        Restart quiz
      </button>
    </div>
  );
}
export default AnswersScreen;
