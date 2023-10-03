import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const  Signup = () =>  {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState(null)
  
  const submitHandler = e => {
    e.preventDefault()
    axios
      .post("http://localhost:8080/signup", {
        username: username,
        password: password,
      })
      .then((res) => {
        setUsername("");
        setPassword("");
        setUser(res.data.username)
      });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h3>Sign up</h3>
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
        {user ? <Navigate to="/profile" replace={true} state={user}/> : null}
        </form>
    </div>
  );
}

export default Signup;
