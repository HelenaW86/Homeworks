import { useSelector } from "react-redux/es/hooks/useSelector";
import { deleteResults, getResults } from "../store/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const result = useSelector((state) => state.auth.results)?.filter((r) => r.user === user);
  useEffect(() => {
    dispatch(getResults(user));
  }, [user]);

const deleteResult = (id) => {

dispatch(deleteResults(id));

}
  return (
    <div>
      {user ? <h1 className="username">{user}!🐨</h1> : null}

      <h2>Resultat</h2>
      {result &&
        result.map((r, i) => (
          <div key={i} className="result-card">
            <h3>{r.card}</h3>
            <p>
              {r.result}/{parseInt(r.max)}
              {r.result === parseInt(r.max) ? <span>✨🎉👑</span> : <></>}{" "}
            </p>
            <button onClick={() => navigate(`/questions/${r.theme}/${r.card}`)}>spela igen</button>
            <button onClick={() => deleteResult(r.resultId)}>Radera</button>
          </div>
        ))}
    </div>
  );
};
export default Profile;
