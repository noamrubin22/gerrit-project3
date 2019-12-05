import React, { useState } from "react";
import axios from "axios"

const Chat = () => {
  const [input, setInput] = useState("");
  const [user, setUser] = useState("");

  const handleInputChange = event => {
    setInput(event.target.value);
    console.log(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault();
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
      <form onSubmit={handleSubmit}>
        <input type="text" name="input" value={input} placeholder="Type something here.." onChange={handleInputChange}/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Chat;
