function Progress({ index, maxPoints, questionNumbers, points, answerIndex }) {
  return (
    <>
      <header className="progress">
        <progress
          className="progress-bar"
          max={questionNumbers}
          value={index + Number(answerIndex != null)}
        ></progress>
        <p>
          Question{" "}
          <strong>
            {index + 1} / {questionNumbers}{" "}
          </strong>
        </p>
        <p>
          {points} / {maxPoints} Points
        </p>
      </header>
    </>
  );
}
export default Progress;
