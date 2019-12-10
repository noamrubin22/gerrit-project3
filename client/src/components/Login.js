import React, { Component, useState, useEffect } from "react";
import { login } from "../services/auth";
import { Alert } from "react-bootstrap";
import {setLocation} from "../services/location";

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
    console.log("Login clicked")
    login(credentials.username, credentials.password)
    .then(data => {
      console.log(data);
      if (data.message) {
        setError(data.message);
        console.log("user: ", data.message);
      } 
      else {
        // lift the data up to the App state
        console.log("setting the user: ", data);
        props.setUser(data);
        //get location and geobucket of user and add it as a state in App
        // setLocation()
        //   .then(result => {
        //     console.log("setting the chatroom: ", result.data)
        //     props.setUserChatroom(result.data);
        //     if (result.data.length === 0) {
        //       props.history.push("/");
        //     }
        //     else {
        //       props.history.push(`/chat/${result.data}`);
        //     }
        //   })
        //   .catch(err => console.log(err))
        if (!props.userChatroom) {
          props.history.push("/map");
        }
        else {
          props.history.push(`/chat/${props.userChatroom}`);
        }
  
    }
  })}
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
        <button className="main-cta orange-gradient shadow" type="submit">LOG IN</button>
      </form>
    </div>
  );
};
export default Login;
