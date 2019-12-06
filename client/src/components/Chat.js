import React, { useState, useEffect } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";

const endpoint = "http://localhost:5555"; // socket io connection
const socket = socketIOClient(endpoint);

const Chat = props => {
  const [input, setInput] = useState("");
  const [user, setUser] = useState("");
  const [display, setDisplay] = useState("");
  const [messageObject, setMessageObject] = useState({
    user: "",
    content: "",
    timestamp: ""
  })

  const handleInputChange = event => {
    setInput(event.target.value);
    /////SOCKET
  }
  
  //when the component is mounted, it starts listening for events of the type "message"
  //if such an event is noticed, the state "display" is changegd, so that the messageg is displayed above the input form
  useEffect(() => {
    console.log("hi")
    socket.on("message", input => {
      setDisplay(input);
    });
  }, []);

  useEffect(() => {
    console.log(props.user)
  })


  
  const handleSubmit = event => {
    event.preventDefault();
    //create a "message object" with all information needed
    let timestamp = new Date();
    let time = timestamp.getHours() + ":" + timestamp.getMinutes();
    let date = timestamp.getMonth()+1 + "-" +timestamp.getDate();

    setMessageObject({
      user: props.user.username,
      content: input,
      timestamp: timestamp,
      time: time,
      date: date
    });

    //when the form is submitted a message is emitted
    socket.emit("message", messageObject)
    // console.log(req.user);
    console.log(event);
    axios.post("/chat", {input})
      .then(() => console.log("send"))
      .catch(err => console.log(err))
    // clean form after message is sent
    setInput("")
  }
  
  return (
    <div style={{backgroundColor: "pink"}}>
      <h1>Chatroom</h1>
      <p><span>{messageObject.user}: </span><span>{messageObject.content}</span></p>
      <p>{messageObject.date}</p>
      <p>{messageObject.time}</p>
      <form onSubmit={handleSubmit}>
        <input type=" text" name="input" value={input} placeholder="Type something here.." onChange={handleInputChange}/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Chat;
