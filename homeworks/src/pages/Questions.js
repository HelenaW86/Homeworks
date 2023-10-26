import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { themeQuestions } from "../store/authSlice";
import { CreateForm } from "../components/CreateForm";

export const Questions = () => {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState();
  const [create, setCreate] = useState(false);
  useEffect(() => {
    if (theme) {
      dispatch(themeQuestions(theme));
    }
  }, [theme]);

  const questions = useSelector((state) => state.auth.themeQuestions);

  const error = useSelector((state) => state.auth.error);
  const navigate = useNavigate();
  const themes = ["Matte", "Svenska", "Engelska", "Geografi"];
  return (
    <>
      <h1 className="username">? questions ?</h1>
      {!create ? (
        <div className="container">
          {themes.map((t, i) => (
            <button
              className="theme-btn"
              key={i}
              onClick={() => {
                setTheme(t);
              }}
            >
              {t}
            </button>
          ))}
          {error ? <p>{error}</p> : null}
          <div style={{ textAlign: "center" }}>
            {questions && theme ? (
              questions?.map((t, i) => (
                <button
                  key={i}
                  className="questions-list-btn"
                  onClick={() => navigate(`/questions/${theme}/${t.name}`)}
                >
                  {t?.name}
                </button>
              ))
            ) : (
              <></>
            )}
            <button
              className="add-question-btn"
              onClick={() => setCreate((state) => !state)}
            >
              Skapa ny
            </button>
          </div>
        </div>
      ) : (
        <CreateForm setCreate={setCreate} />
      )}
    </>
  );
};
