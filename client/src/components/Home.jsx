  
import React from 'react';
import Navbar from './Navbar';
import Chat from './Chat';

function Home(props) {

    return (
        <div className='content'>
            <Navbar user={props.user} />
            <Chat user={props.user} />
        </div>
    );
}

export default Home