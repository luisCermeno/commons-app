import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'


const LoginForm = (props) => {
    //state hooks
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')

    //effect hooks
    useEffect(() => {
        return () => {
            props.seterrormsg('')
        }
        // eslint-disable-next-line
    }, [])


    const handle_change = e => {
        const name = e.target.name;
        const value = e.target.value;
        switch (name) {
            case 'username':
                setusername(value)
                break
            case 'password':
                setpassword(value)
                break
            default:
                console.log('error on switch')
        }
    }


    return (
      <>
        <form onSubmit={e => props.handle_signup(e, {username: username, password: password})}>
            <h4>Sign up</h4>
            <h3>{props.errormsg}</h3>
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
        <div>
          Already have an account? <Link to='/login'>Login</Link>
        </div>
      </>
    )
    
}

export default LoginForm;