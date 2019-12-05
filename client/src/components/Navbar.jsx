import React from 'react';
import axios from 'axios'

function Navbar(props) {
    console.log(props)
    const handleLogout = () => {
        axios.get('/auth/logout').then(response => {
            console.log(response.data)

        }).catch(err => console.log(err))
    }

    return (
        <div className='navbar'>
            <button style={{ 'width': '60px', 'padding': '10px' }} onClick={handleLogout}>bye!</button>
        </div>
    );
}

export default Navbar;