import React from "react";

const Message = props => {
  let {username, content, created_at, userId} = props.message;
  created_at = created_at.slice(11,16);
    
  return(
    <>
    {props.user._id === userId ? 
      <div className="own-message">
      <div className="own-message-body">
        <p className="username">{username}</p>
        <p className="message-content">{content}</p>
        <p className="message-timestamp">{created_at}</p>
      </div>
      <div className="arrow-right"></div>
    </div>
    : 
    <div className="other-message">
      <div className="arrow-left"></div>
      <div className="other-message-body">
        <p className="username">{username}</p>
        <p className="message-content">{content}</p>
        <p className="message-timestamp">{created_at}</p>
      </div>
    </div>}
    </>
  )
}

export default Message;

