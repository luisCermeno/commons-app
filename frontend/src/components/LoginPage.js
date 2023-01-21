import { useState, useEffect } from 'react';

import {Paper, Button, Grid} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

import jigsaw from '../img/jigsaw.png'
import logo from '../img/logocrop.png'
import background from '../img/background.png'

const LoginPage = (props) => {
  // ******** STATE HOOKS ********
  const [mode, setmode] = useState('login')
  const [data, setdata] = useState({})

  // ******** EFFECT HOOKS ********
  useEffect(() => {
    getdata()
  }, [])

  // ******** STYLING ************
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  //xs and up:
  let styles = {
    grid: {
    },
    paper: {
      padding: "2vh 2vw", 
      textAlign: "center", 
      borderRadius: "15px", 
      width: "90%",
      margin: "1vh auto",
    },
    logo: {
      display: "block",
    }
  }
  //sm and up:
  if (sm) {
    styles.paper = {...styles.paper, width: "50%"}
    styles.logo = {...styles.logo, display: "inline",} 
  }

  // ******** UTIL FUNCTIONS ********
  const getdata = () => {
    fetch(props.host + 'getprofile')
    .then (res => res.json())
    .then (json => {
      console.log(json)
      setdata(json)
      console.log(data)
    })
  }

  const isServerUp = () => {
    return Object.keys(data).length === 0
  }

  // ******** RENDER ********
  return (
    <div style={{height: "100vh", backgroundImage: `url(${background})`, alignItems: "center", display: "flex"}}>
      <Grid
      container
      direction="row"
      justify="center" //aligns horizontally
      alignItems="center" //aligns vertically
      >
        <Grid item md={7} sm={12} style={styles.grid}>
          <Paper elevation={3} style={styles.paper}>
            <img alt="jigsaw" src={jigsaw} style={{width: "80px",display: "inline"}}/>
            <img alt="logo" src={logo} style={styles.logo}/>
            {md? 
              <div className="description" style={{paddingBottom: "5vh"}}>
                {lg?
                <>
                  <p>
                    Have you ever wished someone told you about that professor you regret taking so much?
                  </p>
                  <p>
                    Are you a freshman and you feel your campus is so big you can't find your community? 
                  </p>
                </>
                :
                <></>
                }
              <p>
                Whether you are a senior or a freshman, an artist or a geek. Everything you want to know about your school, you'll find it here!
              </p> 
              <p>
                TheCommons&#174; team are envisioning a community where students can learn from each other experiences
                and build accessible and common knowledge about their schools! Hop on, and bring your piece to the puzzle!
              </p>
              </div>
            :
              <></>
            }
          </Paper>
        </Grid>
        <Grid item md={5} sm={12} style={styles.grid}>
          <Paper elevation={3} style={styles.paper}>
            <h4>Discover what is going on in your school:</h4>
            {/* toogle login/signup section */}
            {mode === 'login'?
              <>
                <LoginForm {...props}/>
                <div>
                  Not part of your school commons yet? 
                  <Button disabled = {isServerUp()} style={{display: "inline-block"}}color="secondary" onClick={() => {setmode("signup")}}> Sign up</Button>
                  {isServerUp()? <div> <b>Backend not currently live </b></div>: <></>}
                </div>
              </>
            :
              <>
                <SignupForm {...props} data={data}/>
                <div>
                  Already have an account? <Button  style={{display: "inline-block"}}color="secondary" onClick={() => {setmode("login")}}>Log in</Button>
                </div>
              </>
            }
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default LoginPage;