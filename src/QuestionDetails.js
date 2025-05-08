function QuestionDetails({ question }) {
  return (
    <div className="question-details">
      <div className="detail">Category:{question.category}</div>
      <div className="detail">Difficulty:{question.difficulty}</div>
    </div>
  );
}
export default QuestionDetails;
