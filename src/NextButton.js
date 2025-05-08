function NextButton({ dispatch, answerIndex, index, questionNumbers }) {
  if (answerIndex == null) return null;
  if (index < questionNumbers - 1)
    return (
      <button
        className="btn btn-ui next-button"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next ➡
      </button>
    );
  if (index === questionNumbers - 1)
    return (
      <button
        className="btn btn-ui next-button"
        onClick={() => dispatch({ type: "finished" })}
      >
        Finish{" "}
      </button>
    );
}
export default NextButton;
