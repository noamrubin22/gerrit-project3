import React, { useState, useEffect } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
import Message from "../Message";
import Navbar from "../Navbar";
import green from "../../images/green3.png";
import send from "../../images/send-icon.png";

import "./Chat.css";

const endpoint = process.env.REACT_APP_SERVER_URL; // socket io connection
const socket = socketIOClient(endpoint);

const Chat = props => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleInputChange = event => {
    setInput(event.target.value);
  };

  //when the component is mounted, it starts listening for events of the type "message"
  //if such an event is noticed, the state "messages" is changed, so that the messageg is messagesed above the input form
  useEffect(() => {
    console.log("render")

    socket.on("message", foo => {
      let counter = 8;
      axios
      .get(`/chat/${props.userChatroom}`)
      .then(messages => {
        counter++;
        setMessages(messages.data.reverse().slice(0, counter));
      })
      .catch(err => console.log(err));
    });
  }, []);
  
  useEffect(() => {
      console.log(props);
      axios
        .get(`/chat/${props.userChatroom}`)
        .then(messages => {
          console.log("getting new messages: ", messages);
          setMessages(messages.data.reverse().slice(0, 8));
        })
        .catch(err => console.log(err));
  }, [props.userChatroom])


  const handleSubmit = event => {
    event.preventDefault();
    console.log("posting the chatroom: ", props.userChatroom)
    axios
      .post("/chat", {
        message: input,
        user: props.user,
        chatroom: props.userChatroom
      })
      .then(res => {
        socket.emit("message", input);
      })
      .catch(err => console.log(err));
    // clean form after message is sent
    setInput("");
  };

  return (
    <div>
      {/* <Navbar {...props}/> */}
      <div className="chatroom-info">
        <img className="traffic-light" src={green} alt="green-light" />
        <h2>{props.userChatroom}</h2>
      </div>
      <div className="messageContainer" onLoad={window.scroll(0, 999999)}>
        {messages
          .filter(message => message.chatroom === props.userChatroom)
          .map((message, index) => {
            return (
              <Message
                user={props.user}
                userChatroom={props.userChatroom}
                message={message}
                key={index}
              />
            );
          })}
      </div>
      <div className="buffer-div"></div>
      <div className="chat-input-container">
        <form onSubmit={handleSubmit}>
          <input
            className="input-field"
            type="text"
            name="input"
            value={input}
            placeholder="Type something here.."
            onChange={handleInputChange}
          />
          <button className="send-message" type="submit"></button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
