import { useDispatch, useSelector } from "react-redux";
import { postQuestion, postQuestionCard } from "../store/authSlice";
import { useState } from "react";

export const CreateForm = ({setCreate}) => {
  const dispatch = useDispatch();
  const [checkedRadioValue, setCheckedRadioValue] = useState();
  const [cardName, setCardName] = useState();
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState();
  const [wrong1, setWrong1] = useState();
  const [wrong2, setWrong2] = useState();
  const [wrong3, setWrong3] = useState();
  const user = useSelector((state) => state.auth.user);

  const sendQuestionCard = (e) => {
    e.preventDefault();
    if (question != null) {
      dispatch(
        postQuestion({
          question: question,
          answer: answer,
          wrong1: wrong1,
          wrong2: wrong2,
          wrong3: wrong3,
          name: cardName,
          answers: "j",
        })
      );
    }

    dispatch(
      postQuestionCard({
        author: user,
        theme: checkedRadioValue,
        name: cardName,
      })
    );
    setCreate(false)
  };
  const sendQuestion = (e) => {
    e.preventDefault();
    dispatch(
      postQuestion({
        question: question,
        answer: answer,
        wrong1: wrong1,
        wrong2: wrong2,
        wrong3: wrong3,
        name: cardName,
        answers: "j",
      })
    );
    setQuestion(null);
    setAnswer(null);
    setWrong1(null);
    setWrong2(null);
    setWrong3(null);
  };

  return(
    <div className="container">
    <div style={{ textAlign: "center" }}>
      <form className="create-form">
        <h2>Fråge Kort</h2>
        <div className="create-type-options">
          <label>
            <span className="radio-label">Matte</span>
            <input
              value="Matte"
              type="radio"
              checked={checkedRadioValue === "Matte"}
              onChange={(e) => setCheckedRadioValue(e.target.value)}
            ></input>
          </label>
          <label>
            <span className="radio-label">Svenska</span>
            <input
              value="Svenska"
              type="radio"
              checked={checkedRadioValue === "Svenska"}
              onChange={(e) => setCheckedRadioValue(e.target.value)}
            ></input>
          </label>
          <label>
            <span className="radio-label">Engelska</span>
            <input
              value="Engelska"
              type="radio"
              checked={checkedRadioValue === "Engelska"}
              onChange={(e) => setCheckedRadioValue(e.target.value)}
            ></input>
          </label>
          <label>
            <span className="radio-label">Geografi</span>
            <input
              value="Geografi"
              type="radio"
              checked={checkedRadioValue === "Geografi"}
              onChange={(e) => setCheckedRadioValue(e.target.value)}
            ></input>
          </label>
        </div>
        <label className="label">
          <span className="radio-label">Namn på Kortet:</span>
          <input
            className="input"
            value={cardName ?? ""}
            type="text"
            onChange={(e) => setCardName(e.target.value)}
          ></input>
        </label>
        <h3 style={{ display: "inline-block", width: "100px" }}>
          Frågor
        </h3>
        <label className="label">
          fråga:
          <input
            className="input"
            value={question ? `${question}` : ""}
            type="text"
            onChange={(e) => setQuestion(e.target.value)}
          ></input>
        </label>
        <label className="label">
          Rätt svar
          <input
            className="input"
            value={answer ? `${answer}` : ""}
            type="text"
            onChange={(e) => setAnswer(e.target.value)}
          ></input>
        </label>
        <label className="label">
          Fel svar
          <input
            className="input"
            value={wrong1 ? `${wrong1}` : ""}
            type="text"
            onChange={(e) => setWrong1(e.target.value)}
          ></input>
        </label>
        <label className="label">
          Fel svar
          <input
            className="input"
            value={wrong2 ? `${wrong2}` : ""}
            type="text"
            onChange={(e) => setWrong2(e.target.value)}
          ></input>
        </label>
        <label className="label">
          Fel svar
          <input
            className="input"
            value={wrong3 ? `${wrong3}` : ""}
            type="text"
            onChange={(e) => setWrong3(e.target.value)}
          ></input>
        </label>
        <button className="submit-btn" onClick={sendQuestion}>
          +
        </button>
        <button
          className="submit-btn"
          onClick={(e) => sendQuestionCard(e)}
        >
          Spara
        </button>
      </form>

      <button
        className="add-question-btn"
        onClick={() => setCreate((state) => !state)}
      >
        Back
      </button>
    </div>
  </div>
  )
}