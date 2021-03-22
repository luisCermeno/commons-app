import { useState, useEffect } from 'react';
import {Paper, TextField, Button} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const LoginForm = (props) => {
    //state hooks
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [mode, setmode] = useState('login')

    const windowHeight = `${window.innerHeight.toString()}px`
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
        fluid
        direction="column"
        justify="center" //aligns horizontally
        alignItems="center" //aligns vertically
        style={{height: windowHeight}}
        >
          <Grid item sm={5} xs={12}>
            <Paper elevation={3} style={{padding: "20px 20px", textAlign: "center", maxWidth: "100%"}}>
              <h4>The Commons</h4>
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

export default LoginForm;