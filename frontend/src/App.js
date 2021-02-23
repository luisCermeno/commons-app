import { useEffect, useState } from 'react'
import Nav from './components/Nav'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'

const App = () => {
    //state hooks
    const [displayed_form, set_displayed_form] = useState('')
    const [logged_in, setlogged_in] = useState(localStorage.getItem('token')? true : false)
    const [username, setusername] = useState('')
    const [errormsg, seterrormsg] = useState('')

    //effect hooks
    //onMount (when user returns to the app after closing it)
    useEffect(() => {
        if (logged_in) {
            fetch('http://localhost:8000/getuser/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(json => {
                setusername(json.username)
            })
        }
        // eslint-disable-next-line 
    }, [])

    //functions
    const handle_login = (e, credentials) => {
        console.log('handle_login running')
        e.preventDefault()
        fetch('http://localhost:8000/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(res => res.json())
        .then(json => {
            if (json.token) {
                localStorage.setItem('token', json.token)
                setlogged_in(true)
                set_displayed_form('')
                setusername(json.user.username)
                seterrormsg('')
            }
            else {
                console.log('invalid credentials')
                seterrormsg('Invalid credentials, please try again!')
            }
        })
    }

    const handle_signup = (e, credentials) => {
        console.log('handle_signup running')
        console.log(JSON.stringify(credentials))
        e.preventDefault()
        fetch('http://localhost:8000/signup/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(res => res.json())
        .then(json => {
            localStorage.setItem('token', json.token)
            setlogged_in(true)
            set_displayed_form('')
            setusername(json.username)
        })
    }

    const handle_logout = () => {
        localStorage.removeItem('token')
        setlogged_in(false)
        setusername('')
    }

    const display_form = form => {
        set_displayed_form(form)
        seterrormsg('')
    }

    let form
    switch (displayed_form) {
      case 'login':
        form = <LoginForm handle_login={handle_login} errormsg = {errormsg}/>
        break
      case 'signup':
        form = <SignupForm handle_signup={handle_signup} />
        break
      default:
        form = null
    }

    return (
        <div className="App">
            <Nav
                logged_in={logged_in}
                display_form={display_form}
                handle_logout={handle_logout}
            />
            {form}
            <h3>
                {logged_in? `Hello, ${username}`: 'Please Log In'}
            </h3>
        </div>
    )

}

export default App