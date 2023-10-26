import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { cardQuestions, postResult } from "../store/authSlice";

export const PracticeOn = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state?.auth?.questions);
  const user = useSelector((state) => state?.auth?.user);
  const error = useSelector((state) => state.auth.error);
  const { theme, name } = useParams();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [check, setCheck] = useState(false);
  const [rightAnswers, setRightAnswers] = useState(0);
  useEffect(() => {
    dispatch(cardQuestions({ theme, name }));
  }, [name]);

  useEffect(() => {}, [check]);

  useEffect(() => {
    if (questions) {
      const answers = [
        { answer: questions[questionIndex].answer, right: true },
        { answer: questions[questionIndex].wrong1, right: false },
        { answer: questions[questionIndex].wrong2, right: false },
        { answer: questions[questionIndex].wrong3, right: false },
      ];
      answers.sort(() => Math.random() - 0.5);
      setOptions(answers);
    }
  }, [questionIndex, questions]);

  const CheckCorrect = (o, i) => {
    if (o.right) {
      setRightAnswers((state) => state + 1);
    }
    setCheck(i);
  };

  const reset = () => {
    setCheck(false);
    setQuestionIndex(0);
    setRightAnswers(0)
  };

  const save = () => {
    const card = name;
    const result =  rightAnswers;
    const max = questions.length;

    dispatch(postResult({  user, theme, card, result, max }));
  }
  return (
    <>
      ✨🎉👑
      <h1 className="username">{name}</h1>
      {questions && (
        <div style={{ position: "relative", width: "600px", margin: "auto" }}>
          {questionIndex + 1 < questions.length && check !== false ? (
            <span
              onClick={() => {
                setQuestionIndex((state) => state + 1);
                setCheck(null);
              }}
              style={{
                display: "inline-block",
                position: "absolute",
                right: "0",
                color: "white",
                left: "auto",
                top: "80px",
                bottom: "auto",
                cursor: "pointer",
              }}
            >
              Next Question
            </span>
          ) : (
            <></>
          )}
          <div className="question-card">
            <p style={{ textAlign: "right" }}>
              {questionIndex + 1}/{questions.length}
            </p>
            <p className="question-text">
              {questions[questionIndex]?.question}
            </p>
          </div>
          <div className="options">
            {options.map((o, i) => {
              return (
                <div
                  style={{
                    position: "relative",
                    pointerEvents: check || check === 0 ? "none" : "auto",
                  }}
                  key={i}
                  className="option"
                  onClick={() => CheckCorrect(o, i)}
                >
                  <p className="option-text">{o?.answer}</p>
                  {check === i && (
                    <span
                      style={{
                        position: "absolute",
                        right: "0",
                        bottom: "5px",
                        fontSize: "20px",
                      }}
                    >
                      {o.right ? "✅" : "❌"}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          {questionIndex + 1 === questions.length && check !== null ? (
            <>
              {rightAnswers === questions.length && <p>👑</p>}
              <h3>
                {rightAnswers}/{questions.length}
              </h3>
              <button onClick={() => save()}>Spara resultat🎖️</button>
              <button onClick={() => reset()}>Spela igen! 😎</button>
            </>
          ) : (
            <></>
          )}
          {error && <p>{error}</p>}
        </div>
      )}
    </>
  );
};
