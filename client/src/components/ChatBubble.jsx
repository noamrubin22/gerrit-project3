import React from 'react';

function ChatBubble(props) {

    const Bubble = () => {

        const postedByUser = props.content.postedBy._id === props.user._id;

        if (postedByUser) {
            return (
                <>
                    <img className='user-head-me' src={props.content.postedBy.picture} alt={props.content.postedBy.username} />
                    <div className='chat-bubble-me'>
                        <span>Me</span>
                        <p>{props.content.content}</p>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <img className='user-head' src={props.content.postedBy.picture} alt={props.content.postedBy.username} />
                    <div className='chat-bubble'>
                        <span>{props.content.postedBy.firstName}</span>
                        <p>{props.content.content}</p>
                    </div>
                </>
            )
        }
    }
    return (
        <Bubble />
    );
}
export default ChatBubble;