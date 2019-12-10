import React, { useState, useEffect } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
import Message from "./Message";
 

const endpoint = "http://localhost:5555"; // socket io connection
const socket = socketIOClient(endpoint);

const Chat = props => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleInputChange = event => {
    setInput(event.target.value);
  }
  
  //when the component is mounted, it starts listening for events of the type "message"
  //if such an event is noticed, the state "messages" is changed, so that the messageg is messagesed above the input form
  useEffect(() => {
    console.log(props.userChatroom);
    axios.get(`/chat/${props.userChatroom}`)
      .then(messages => {
        console.log(messages);
        setMessages(messages.data);
      })
      .catch(err => console.log(err));

    socket.on("message", foo => {
      axios.get(`/chat/${props.userChatroom}`)
        .then(messages => {
          console.log(messages);
          setMessages(messages.data);
        })
        .catch(err => console.log(err));

    });

    const checkLocation = setInterval( () => {
      
    })
  }, []);
  
  const handleSubmit = event => {
    console.log(props.userChatroom)
    event.preventDefault();
    axios.post("/chat", ({message:input, user:props.user, chatroom: props.userChatroom}))
      .then(() => {
        socket.emit("message", input)
      })
      .catch(err => console.log(err))
    // clean form after message is sent
    setInput("")
  }


  return (
    <div style={{backgroundColor: "pink"}}>
      <h1>Chatroom</h1>
      <div>
      {messages
        .filter(message => message.chatroom === props.userChatroom)
        .map((message, index) => {
        return(
          <Message user={props.user} userChatroom={props.userChatroom} message={message} key={index}/>
        )
      })}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="input" value={input} placeholder="Type something here.." onChange={handleInputChange}/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Chat;
