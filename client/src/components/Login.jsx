import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

function Login(props) {

    let [loggedIn, setLoggedIn] = useState(props.user)

    const [username, setUsername] = useState("")

    const handleChange = e => {
        const { value } = e.target;
        setUsername(value)
    }
    const redirect = user => {
        setLoggedIn(user)
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log("form")
        axios.post('/auth/fastlogin', { username }).then(response => {
            redirect(response.data)
        }).catch(err => console.log(err))
    }

    let btnDisplay = username ? 'visible' : 'hidden'
    console.log(loggedIn, props.user)

    const randPlaceholder = () => {
        const dif = ['Welcome back !', "Hi:) What's your name?", "My name is ..."];
        return dif[Math.floor(Math.random() * dif.length)]
    }

    return loggedIn ? <Redirect to="/" /> : (
        <div className='auth-container'>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder={randPlaceholder()} value={username} onChange={handleChange} name='username' />
                <button style={{ 'visibility': btnDisplay }}>I'm back!</button>
            </form>
        </div>
    )
}

export default Login;