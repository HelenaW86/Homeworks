import { useSelector } from "react-redux/es/hooks/useSelector";
import { deleteResults, getResults } from "../store/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const result = useSelector((state) => state.auth.results)

  useEffect(() => {
    if(user){
      dispatch(getResults(user));
    }
  }, [user]);
  useEffect(() => {
 
      dispatch(getResults(user));

  }, []);

  const deleteResult = (id) => {
    dispatch(deleteResults(id));
  };
  return (
    <div>
      {user ? <h1 className="username">{user}!🐨</h1> : null}

      {result && (
        <>
          <h2>Resultat</h2>
          {result.map((r, i) => (
          <div key={i} className="result-card">
            <div>
              <h3 style={{ display: "inline-block" }}>{r.card}</h3>
              <button
                className="result-practice-btn"
                onClick={() => navigate(`/questions/${r.theme}/${r.card}`)}
              >
                Öva
              </button>
            </div>
            <div>
              <p>
                {r.result}/{parseInt(r.max)}
                {r.result === parseInt(r.max) ? (
                  <span>✨🎉👑</span>
                ) : (
                  <></>
                )}{" "}
              </p>

              <button
                className="result-delete-btn"
                onClick={() => deleteResult(r.resultId)}
              >
                Radera
              </button>
            </div>
          </div>
          ))}
        </>
      )}
    </div>
  );
};
export default Profile;
