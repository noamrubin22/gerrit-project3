import React, { useState } from 'react'

function ChatForm(props) {

    const [message, setMessage] = useState('');

    const handleChange = e => {
        const { value } = e.target;
        setMessage(value);
        props.isTyping(!!value.length)
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.sendMessage(message);
        setMessage('');
    }

    return (
        <>
            {props.systemFeedback && <span>props.systemFeedback</span>}
            <form onSubmit={handleSubmit} className='chat-form'>
                <img src={props.user.picture} className='user-head' style={{ 'boxShadow': 'none' }} alt={props.user.username} />
                <input type="text" name='message' onChange={handleChange} value={message} placeholder='Type your message here...' />
            </form>
        </>
    );
}
export default ChatForm