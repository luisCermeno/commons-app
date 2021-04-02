import { useState, useEffect } from 'react';
import {Paper, Button} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import jigsaw from '../img/jigsaw.png'
import logo from '../img/logocrop.png'
import background from '../img/background.png'

import LoginForm from './LoginForm'
import SignupForm from './SignupForm'


const LoginPage = (props) => {
  // ******** STATE HOOKS ********
  const [mode, setmode] = useState('login')
  const [data, setdata] = useState({})

  // ******** EFFECT HOOKS ********
  useEffect(() => {
    getdata()
  }, [])

  const getdata = () => {
    fetch(`http://localhost:8000/getprofile`)
    .then (res => res.json())
    .then (json => {
      console.log(json)
      setdata(json)
    })
}

  return (
    <Grid
    container
    direction="row"
    justify="space-around" //aligns horizontally
    alignItems="center" //aligns vertically
    style={{height: "100vh", backgroundImage: `url(${background})`}}
    >
      <Grid item md={7} sm={12}>
        <Paper elevation={3} style={{padding: "3vh 4vw", textAlign: "center", width: "50%", borderRadius: "15px", margin: "0 auto"}}>
          <img src={jigsaw} style={{width: "80px",display: "inline"}}/>
          <img src={logo} style={{display: "inline"}}></img>
          <div className="description" style={{paddingBottom: "5vh"}}>
            <p>
              How many times have you wished a senior student would have told you about that bad class you regret taking so much?
            </p>
            <p>
              Are you a freshman and you feel your campus is so big that you will never find your future squad?
            </p>
            <p>
              Whether you are a senior or a freshman, a nerd or a jock. Whatever you want to know about your school, you'll find it here!
            </p> 
            <p>
              TheCommons&#174; team have envisioned a community where students learn from each other experiences
              and build a common knowledge about their schools! Hop on, a bring your piece to the puzzle!
            </p>
          </div>
          
        </Paper>
      </Grid>
      <Grid item md={5} sm={12}>
        <Paper elevation={3} style={{padding: "4vh 4vw", textAlign: "center", width: "50%", borderRadius: "15px", margin: "0 auto"}}>
          <h4>Discover what is going on in your school:</h4>
          {/* toogle login/signup section */}
          {mode === 'login'?
            <>
              <LoginForm {...props}/>
              <div>
                Not part of your school commons yet? <Button style={{display: "inline-block"}}color="primary" onClick={() => {setmode("signup")}}>Sign up</Button>
              </div>
            </>
          :
            <>
              <SignupForm {...props} data={data}/>
              <div>
                Already have an account? <Button style={{display: "inline-block"}}color="primary" onClick={() => {setmode("login")}}>Log in</Button>
              </div>
            </>
          }
        </Paper>
      </Grid>
    </Grid>
  )

}

export default LoginPage;