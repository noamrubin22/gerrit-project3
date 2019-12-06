import React, { useState, useEffect } from "react";

const Message = props => {
  
  console.log(props.user);
  console.log(props.message);
  let {username, content, created_at, userId} = props.message;
  created_at = created_at.slice(11,16);

  const generalStyle = {
    border: "1px solid black",
    backgroundColor: "white",
    margin: "10px 0 10px 0",
    width: "80vw"
  }

  const ownStyle = {
    border: "1px solid black",
    backgroundColor: "yellow",
     margin: "10px 0 10px 0",
    width: "80vw"
  }

  
  return(
    <div style={props.user._id === userId ? ownStyle : generalStyle}>
      <p>Username: {username}</p>
      <p>Message: {content}</p>
      <p>Time: {created_at}</p>
    </div>
  )
}

export default Message;