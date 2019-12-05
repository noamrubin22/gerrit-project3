import socketIOClient from "socket.io-client";

const endpoint = "http://localhost:5555"; // socket io connection
const socket = socketIOClient(endpoint);

export const SystemFeedback = (feedback, clear) => {

    setTimeout(() => {

        clear('')
    }, 2000)

    return feedback
}






export const socketIn = props => {

    socket.on("message", data => {

        const { type, message } = data

        if (type === 'message') props.getFeed()

        else if (type === 'typing') props.setActionFeedback(message)

        else if (type === 'system') props.setSystemFeedback([...props.systemFeedback, message])
    });
}



export const socketOut = props => {

    const { type, message } = props

    socket.send({ type, message })
}