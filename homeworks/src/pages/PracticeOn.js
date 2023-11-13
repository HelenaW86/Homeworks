import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { cardQuestions, postResult, putResult } from "../store/authSlice";

export const PracticeOn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const questions = useSelector((state) => state?.questions);
  const user = useSelector((state) => state?.user);
  const error = useSelector((state) => state?.error);
  const result = useSelector((state) => state?.results)
  const { theme, name } = useParams();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [check, setCheck] = useState(null);
  const [rightAnswers, setRightAnswers] = useState(0);

  console.log(questions)
  useEffect(() => {
    dispatch(cardQuestions({ theme, name }));
  }, [name]);

  useEffect(() => {}, [check]);

  useEffect(() => {
    if (questions) {
      const answers = [
        { answer: questions[questionIndex]?.answer, right: true },
        { answer: questions[questionIndex]?.wrong1, right: false },
        { answer: questions[questionIndex]?.wrong2, right: false },
        { answer: questions[questionIndex]?.wrong3, right: false },
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
    setCheck(null);
    setQuestionIndex(0);
    setRightAnswers(0);
  };

  const save = () => {
    if (result?.some((i) => i.card.includes(name))) {
      const card = name;
    const results = rightAnswers;
    const max = questions.length;
    const resultId = result?.forEach((i) => i.card.includes(name).resultId)
      dispatch(putResult({ user, theme, card, results, max, resultId }));
      
    } else {
      const card = name;
      const result = rightAnswers;
      const max = questions.length;
      dispatch(postResult({ user, theme, card, result, max }));
    }
    navigate("/profile")
    
  };
  return (
    <>
      ✨🎉👑
      <h1 className="username">{name}</h1>
      {questions && (
        <div className="questions">
          {questionIndex + 1 < questions.length && check !== null ? (
            <span
              onClick={() => {
                setQuestionIndex((state) => state + 1);
                setCheck(null);
              }}
              className="next-question-btn"
            >
              Next Question
            </span>
          ) : (
            <></>
          )}
          <div className="question-card">
            <p className="question-counter">
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
                    <span className="check-icon">
                      {o.right ? "✅" : "❌"}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          {questionIndex + 1 === questions.length && check !== null ? (
            <div className="game-btn-container">
              {rightAnswers === questions.length && <p>👑</p>}
              <h3>
                {rightAnswers}/{questions.length}
              </h3>
              <button className="game-btn" onClick={() => save()}>Spara resultat🎖️</button>
              <button  className="game-btn" onClick={() => reset()}>Spela igen! 😎</button>
            </div>
          ) : (
            <></>
          )}
          {error && <p>{error}</p>}
        </div>
      )}
    </>
  );
};
