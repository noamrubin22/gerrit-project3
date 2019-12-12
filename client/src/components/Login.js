import React, { useState } from "react";
import { login } from "../services/auth";
import { Alert } from "react-bootstrap";
import { setLocation } from "../services/location";


const Login = props => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = event => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    login(credentials.username, credentials.password).then(data => {
      if (data.message) {
        setError(data.message);
      } else {
        // lift the data up to the App states
        props.setUser(data);

        if (!props.userChatroom) {
          props.history.push("/map");
        } else {
          props.history.push(`/chat/${props.userChatroom}`);
        }
      }
    });
  };
  return (
    <div>
      <form className="form-submission" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="username">Username: </label>
          <input
            className="input-field"
            type="text"
            name="username"
            id="username"
            value={props.username}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password: </label>
          <input
            className="input-field"
            type="password"
            name="password"
            id="password"
            value={props.password}
            onChange={handleChange}
          />
        </div>
        {/* {error && <Alert variant="danger">{error}</Alert>} */}
        <button className="main-cta orange-gradient shadow" type="submit">
          LOG IN
        </button>
      </form>
    </div>
  );
};
export default Login;
