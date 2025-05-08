function StartScreen({ dispatch, questions, category, difficulty }) {
  const categories = [...new Set(questions.map((q) => q.category))];
  const Difficulties = [...new Set(questions.map((q) => q.difficulty))];
  return (
    <div className="start-screen">
      <h2>Welcome to The Tech Quiz</h2>

      <div className="buttons">
        {category !== "select" && difficulty !== "select" && (
          <button
            className="btn btn-ui"
            onClick={() =>
              dispatch({
                type: "start",
              })
            }
          >
            Let's start
          </button>
        )}
        <select
          className="btn btn-ui"
          value={category}
          onChange={(e) =>
            dispatch({
              type: "filterCategoryQuestions",
              payload: e.target.value,
            })
          }
        >
          <option value="select">Select a category</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          className="btn btn-ui"
          value={difficulty}
          onChange={(e) =>
            dispatch({
              type: "filterDifficultiesQuestions",
              payload: e.target.value,
            })
          }
        >
          <option value="select">Select a difficulty</option>
          {Difficulties.map((dif, idx) => (
            <option key={idx} value={dif}>
              {dif}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
export default StartScreen;
