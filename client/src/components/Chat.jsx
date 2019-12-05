import React, { useState, useEffect } from 'react';
import ChatForm from './ChatForm';
import ChatArea from './ChatArea';
import axios from 'axios';
import { SystemFeedback, socketIn, socketOut } from '../socket/socket-io';


function Chat(props) {

    // STATE :
    const [feed, setFeed] = useState([])
    const [actionFeedback, setActionFeedback] = useState("");
    const [systemFeedback, setSystemFeedback] = useState([]);

    // AXIOS GET FEED :
    const getFeed = () => {
        axios.get('/chat/feed').then(response => {
            setFeed(response.data)
        })
    }

    // SOCKET IO CLIENT RECEIVE MSG :
    socketIn({ setActionFeedback, setSystemFeedback, systemFeedback, getFeed });

    // WHEN CLIENT IS TYPING :
    const isTyping = typing => {

        socketOut({ type: 'typing', message: typing ? `${props.user.firstName} is typing...` : '' })
    }


    // SENDING MESSAGE :
    const sendMessage = (message) => {

        // SOCKET IO CLIENT SENDING MSG :
        socketOut({ type: 'typing', message: '' })

        if (!message) return false

        // AXIOS POST MESSAGE :
        axios.post('/chat/postmessage', { user: props.user, message }).then(response => {

            setFeed([...feed, response.data])

            socketOut({ type: 'message', message: response.data })

        }).catch(err => console.log(err))
    }

    // COMPONENT DID MOUNT :
    useEffect(() => {

        // SOCKET IO CLIENT SEND SYSTEM MSG :
        socketOut({ type: 'system', message: `${props.user.firstName} is connected !` })

        getFeed()
    }, [])

    return (
        <div className='chat-content'>

            <ChatArea feed={feed} user={props.user} />

            <div className='feedbacks'>
                <p>{SystemFeedback(systemFeedback, setSystemFeedback)}</p>
                {actionFeedback && <p>{actionFeedback}</p>}
            </div>

            <ChatForm sendMessage={sendMessage} user={props.user} isTyping={isTyping} />
        </div>
    );
}

export default Chat;