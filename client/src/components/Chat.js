import React, { useState, useEffect } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
import Message from "./Message";

const endpoint = "http://localhost:5555"; // socket io connection
const socket = socketIOClient(endpoint);

const Chat = props => {
  const [input, setInput] = useState("");
  const [user, setUser] = useState("");
  const [display, setDisplay] = useState([]);

  const handleInputChange = event => {
    setInput(event.target.value);
    /////SOCKET
  };

  //when the component is mounted, it starts listening for events of the type "message"
  //if such an event is noticed, the state "display" is changegd, so that the messageg is displayed above the input form
  useEffect(() => {
    setUser(props.user);

    axios
      .get("/chat")
      .then(messages => {
        console.log(messages.data);
        setDisplay(messages.data);
      })
      .catch(err => console.log(err));

    socket.on("message", foo => {
      axios
        .get("/chat")
        .then(messages => {
          console.log(messages.data);
          setDisplay(messages.data);
        })
        .catch(err => console.log(err));
    });
  }, []);

  const handleSubmit = event => {
    event.preventDefault();

    //when the form is submitted a message is emitted

    // console.log(req.user);
    // console.log(event);
    axios
      .post("/chat", { message: input, user: user })
      .then(() => socket.emit("message", input))
      .catch(err => console.log(err));
    // clean form after message is sent
    setInput("");
  };

  return (
    <div style={{ backgroundColor: "pink" }}>
      <h1>Chatroom</h1>
      <div>
        {display.map((message, index) => {
          return <Message user={user} message={message} key={index} />;
        })}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="input"
          value={input}
          placeholder="Type something here.."
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Chat;
