import React, { useState, useEffect } from "react";

const Message = props => {
  const {posted_by, content, updated_at} = props.message;
  console.log(posted_by)

  return(
    <div>
      <p>{posted_by}</p>
      <p>{content}</p>
      <p>{updated_at}</p>
    </div>
  )
}

export default Message;