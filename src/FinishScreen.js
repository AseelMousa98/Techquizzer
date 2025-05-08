function FinishScreen({ points, maxPoints, dispatch, highscore }) {
  const percentage = (points / maxPoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "💯";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🤔";
  if (percentage > 0 && percentage < 50) emoji = "😐";
  if (percentage === 0) emoji = "🤦‍♂️";
  return (
    <div className="finish-screen">
      <p className="result">
        <span>{emoji}</span>
        You scored <strong>{points}</strong> out of {maxPoints} (
        <span>{Math.ceil(percentage)} % </span> )
      </p>
      <p className="highscore">(HighScore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restartQuiz" })}
      >
        {" "}
        Restart quiz
      </button>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "CheckAnswers" })}
      >
        {" "}
        Check Answers
      </button>
    </div>
  );
}
export default FinishScreen;
