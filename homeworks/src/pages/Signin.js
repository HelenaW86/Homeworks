import React, { useState } from "react";
import { signin } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Signin() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault()
    dispatch(signin({username, password}))
    .then(() => {
      setUsername("");
      setPassword("");
    });
  };

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <h3>Sign in</h3>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <button type="submit">Submit</button>
        </div>
        {error ? <p>{error}</p> : null}
        {user ? <Navigate to="/profile" replace={true} /> : null}
      </form>
    </div>
  );
}

export default Signin;
