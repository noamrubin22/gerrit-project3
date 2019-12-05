import React from 'react'
import ChatBubble from './ChatBubble';

function ChatArea(props) {

    const messages = props.feed && props.feed.map((x, i) => {
        return <ChatBubble key={i} content={x} user={props.user} />
    })
    return (
        <div className='chat-area'>
            <ul>
                {messages}
            </ul>
        </div>
    );
}

export default ChatArea;