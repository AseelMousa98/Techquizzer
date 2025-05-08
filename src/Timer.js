import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className={`timer ${mins < 1 ? "timer warning" : ""}`}>
      {mins >= 10 ? mins : `0${mins}`}:{seconds >= 10 ? seconds : `0${seconds}`}
    </div>
  );
}
export default Timer;
