import React, { useState } from "react";
import { signin } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Signin() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const user = useSelector((state) => state?.user);
  const error = useSelector((state) => state?.error);
  const dispatch = useDispatch();
console.log(user)
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin({ username, password })).then(() => {
      setUsername("");
      setPassword("");
    });
  };
console.log(user)
  return (
    <div className="App">
      <form className="form" onSubmit={submitHandler}>
        <h3>Logga in</h3>
        <label className="label" htmlFor="username">
          Namn
        <input
          className="input"
          id="username"
          type="text"
          value={username ?? ""}
          onChange={(e) => setUsername(e.target.value)}
        />
                </label>
        <label className="label" htmlFor="password">
          Lösenord
        <input
          className="input"
          id="password"
          type="text"
          value={password ?? ""}
          onChange={(e) => setPassword(e.target.value)}
        />
            </label>
        <div>
          <button className="submit-btn" type="submit">
            Skicka
          </button>
        </div>
        {error ? <p>{error}</p> : null}
        {user ? <Navigate to="/profile" replace={true} /> : null}
      </form>
    </div>
  );
}

export default Signin;
