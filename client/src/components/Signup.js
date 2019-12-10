import React, { useState } from "react";
import { signup } from "../services/auth";
import {setLocation} from "../services/location";

const Signup = props => {
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
    signup(credentials.username, credentials.password).then(data => {
      if (data.message) {
        setError(data.message);
        console.log(data.message);
      } else {
        // lift the data up to the App state
        props.setUser(data);
        //redirect
        setLocation(data)
          .then(result => {
            (console.log("setting the chatroom: ", result))
            props.setUserChatroom(result.userChatroom);
            if (result.userChatroom.length === 0) {
              props.history.push("/map");
            }
            else {
              props.history.push(`/chat/${result.data}`);
            }
          })
          .catch(err => console.log(err))
      }
    });
  };

  return (
    <div>
      <form className="form-submission" onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="username">Username: </label>
            <input
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
              type="password"
              name="password"
              id="password"
              value={props.password}
              onChange={handleChange}
            />
          </div>
        {/* {error && <Alert variant="danger">{error}</Alert>} */}
        <button className="main-cta orange-gradient shadow" type="submit">SIGN UP</button>
      </form>
    </div>
  );
};
export default Signup;
