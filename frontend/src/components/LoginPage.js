import { useState, useEffect } from 'react';
import {Paper, TextField, Button} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import jigsaw from '../img/jigsaw.png'
import TableFooter from '@material-ui/core/TableFooter';
import logo from '../img/logocrop.png'

const LoginPage = (props) => {
    //state hooks
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [mode, setmode] = useState('login')
    
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
        <Grid
        container
        direction="row"
        justify="space-around" //aligns horizontally
        alignItems="center" //aligns vertically
        style={{height: "100vh", backgroundImage: "url(/puzzle.png)"}}
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
              {mode === 'login'?
              <div>
                <form style={ {marginBottom: "20px",} } autoComplete="off" onSubmit={e => props.handle_login(e, {username: username, password: password})}>
                    <div style={{marginBottom: "20px",}}>
                      <div>
                      <TextField id="standard-required" label="Username" name="username" value={username} onChange={handle_change}/>
                      </div>
                      <div>
                      <TextField id="standard-password-input" label="Password" type="password" name="password" value={password} onChange={handle_change}/>
                      </div>
                    </div>
                    <h3>{props.errormsg}</h3>
                    <Button style= {{width: "100%"}}type="submit" variant="contained" color="primary">Log in</Button>
                </form>
                <div>
                  Not part of your school commons yet? <Button style={{display: "inline-block"}}color="primary" onClick={() => {setmode("signup")}}>Sign up</Button>
                </div>
              </div>
              :
              <div>
                <form style={ {marginBottom: "20px",} } autoComplete="off" onSubmit={e => props.handle_signup(e, {username: username, password: password})}>
                  <div style={{marginBottom: "20px",}}>
                    <div>
                    <TextField id="standard-required" label="Username" name="username" value={username} onChange={handle_change}/>
                    </div>
                    <div>
                    <TextField id="standard-password-input" label="Password" type="password" name="password" value={password} onChange={handle_change}/>
                    </div>
                  </div>
                  <h3>{props.errormsg}</h3>
                  <Button style= {{width: "100%"}}type="submit" variant="contained" color="primary">Sign up</Button>
                </form>
                <div>
                  Already have an account? <Button style={{display: "inline-block"}}color="primary" onClick={() => {setmode("login")}}>Log in</Button>
                </div>
              </div>
              }
            </Paper>
          </Grid>
          
        </Grid>
        
        </>
    )
    
}

export default LoginPage;