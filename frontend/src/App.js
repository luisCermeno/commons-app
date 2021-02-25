import { useEffect, useState } from 'react'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/Home'
import UI from './components/UI'
import Profile from './components/Profile';

const App = () => {
  //state hooks
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
        setusername(json.user.username)
      }
      else {
        seterrormsg('Invalid credentials, please try again!')
      }
    })
  }

  const handle_signup = (e, credentials) => {
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
      console.log(json)
      if (json.token) {
        localStorage.setItem('token', json.token)
        setlogged_in(true)
        setusername(json.username)
      }
      else {
        seterrormsg('Username already taken')
      }
    })
  }

  const handle_logout = () => {
    localStorage.removeItem('token')
    setlogged_in(false)
    setusername('')
  }

  return (
    <Router>
      <div className="App">

          {logged_in?
          <UI
            logged_in={logged_in}
            handle_logout={handle_logout}
            username={username}
          >
            <Switch>
              <Route exact path='/'>
                <Home logged_in={logged_in} username={username}/> 
              </Route>
              <Route exact path='/profile'>
                <Profile username={username}/> 
              </Route>
              <Route path='/' > 
                <Redirect to="/" />
              </Route>
            </Switch>
          </UI>
          :
          <Switch>
            <Route exact path='/login' > 
              <LoginForm handle_login={handle_login} errormsg = {errormsg} seterrormsg={seterrormsg}/> 
            </Route>
            <Route exact path='/signup'> 
              <SignupForm handle_signup={handle_signup} errormsg = {errormsg} seterrormsg={seterrormsg}/>
            </Route>
            <Route path='/' > 
              <Redirect to="/login" />
            </Route>
          </Switch>
          }
      </div>
    </Router>
  )
}

export default App