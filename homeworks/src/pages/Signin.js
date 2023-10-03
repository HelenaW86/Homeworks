import React, { useState } from "react";
import axios from "axios";

function Signin() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  
  const submitHandler = () => {
    axios
      .post("http://localhost:8080/signup", {
        username: username,
        password: password,
      })
      .then((data) => {
        console.log(data);
        setUsername("");
        setPassword("");
      });
  };

  return (
    <div className="App">
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
        </form>
    </div>
  );
}

export default Signin;
