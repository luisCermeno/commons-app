import React, { useState } from 'react';
import PropTypes from 'prop-types';

const LoginForm = (props) => {
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')


    const handle_change = e => {
        const name = e.target.name;
        const value = e.target.value;
        switch (name) {
            case 'username':
                setusername(value)
                break
            case 'password':
                setpassword(value)
            default:
                console.log('error on switch')
        }
    }


    return (
        <form onSubmit={e => props.handle_login(e, {username: username, password: password})}>
            <h4>Log In</h4>
            <label htmlFor="username">Username</label>
            <input
                type="text"
                name="username"
                value={username}
                onChange={handle_change}
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                name="password"
                value={password}
                onChange={handle_change}
            />
            <input type="submit" />
        </form>
    )
    
}

export default LoginForm;

LoginForm.propTypes = {
    handle_login: PropTypes.func.isRequired
}