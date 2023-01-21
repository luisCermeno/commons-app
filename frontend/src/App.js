import { useEffect, useState } from 'react'
import {Router, Switch, Route, Redirect} from 'react-router-dom'
import history from './history'

import LoginPage from './components/LoginPage'
import Home from './components/Home'
import UI from './components/UI'
import Profile from './components/Profile';
import Room from './components/Room'
import Create from './components/Create'

const App = () => {
  const host = 'http://localhost:8000/'
  //STATE HOOKS
  const [logged_in, setlogged_in] = useState(localStorage.getItem('token')? true : false)
  const [username, setusername] = useState('')
  const [errormsg, seterrormsg] = useState('')
  const [active_peer, setactive_peer] = useState('')

  //EFFECT HOOKS
  //onMount (when user returns to the app after closing it)
  useEffect(() => {
    if (logged_in) {
      fetch(host + 'getuser/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
      .then(res => res.json())
      .then(json => {
        if (json.username) {
          setusername(json.username)
        }
        else {
          setlogged_in(false)
        }
      })
      .catch((error) => {
        console.log(error)
        setlogged_in(false)
      })
    }
    // eslint-disable-next-line 
  }, [])

  //AUTHENTICATION HANDLERS
  const handle_login = (credentials) => {
    fetch(host + 'login/', {
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
  const handle_signup = (credentials, profile) => {
    fetch(host + 'signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...credentials, ...profile})
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
    //first delete any active peer if there is any
    if (active_peer !== '') {
      fetch(host + 'logpeer/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          action: 'logout',
          username: username,
          peerID: active_peer,
          roomID: '',
        })
      })
      .then( () => {
        localStorage.removeItem('token')
        setlogged_in(false)
        setusername('')
      })
    }
    else {
      localStorage.removeItem('token')
      setlogged_in(false)
      setusername('')
    }
  }

  //RENDER
  return (
    <Router history ={history}>
      <div className="App">
          {logged_in?
            <UI
            logged_in={logged_in}
            handle_logout={handle_logout}
            username={username}
            >
              <Switch>
                <Route exact path='/'>
                  <Home
                  host = {host}
                  logged_in={logged_in} 
                  username={username}
                  /> 
                </Route>
                <Route exact path='/create'>
                  <Create host = {host}/> 
                </Route>
                <Route exact path='/profile/:username'>
                  <Profile username={username} host = {host}/> 
                </Route>
                <Route exact path='/room/:roomID'>
                  <Room username={username} setactive_peer={setactive_peer} host = {host}/> 
                </Route>
                <Route path='/' > 
                  <Redirect  to='/' />
                </Route>
              </Switch>
            </UI>
            :
            <Switch>
              <Route exact path='/' > 
                <LoginPage 
                handle_login={handle_login}
                handle_signup={handle_signup}
                errormsg = {errormsg} 
                seterrormsg={seterrormsg}
                /> 
              </Route>
              <Route path='/' > 
                <Redirect to='/' />
              </Route>
            </Switch>
          }
      </div>
    </Router>
  )
}

export default App