import React, { useState, useEffect } from 'react';
// import ChatForm from './ChatForm';
import ChatArea from './ChatArea';
import axios from 'axios';
import { SystemFeedback, socketIn, socketOut } from '../socket/socket-io';

const Chat = props => {
  const [feed, setFeed] = useState([])
  const [actionFeedback, setActionFeedback] = useState("");
  const [systemFeedback, setSystemFeedback] = useState([]);

  return (
    <div className='chat-content'>
        <ChatArea feed={feed} user={props.user} />
    </div>
  );
}

export default Chat;