import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import {Paper, TextField, Button} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import useStyles from '../styles'


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
        <Grid
        container
        fluid
        direction="row"
        justify="center"
        alignItems="center"
        >
          <Grid item sm={4} xs={12}>
            <Paper elevation={3} style={{padding: "20px 20px", textAlign: "center"}}>
              <form style={ {marginBottom: "20px",} } autoComplete="off" onSubmit={e => props.handle_login(e, {username: username, password: password})}>
                  <h4>Log In</h4>
                  <h3>{props.errormsg}</h3>
                  <div style={{marginBottom: "20px",}}>
                    <div>
                    <TextField id="standard-required" label="Username" name="username" value={username} onChange={handle_change}/>
                    </div>
                    <div>
                    <TextField id="standard-password-input" label="Password" type="password" name="password" value={password} onChange={handle_change}/>
                    </div>
                  </div>
                  <Button type="submit" variant="contained" color="primary">Log in</Button>
              </form>
              <div>
                Not part of the community yet? <Link to='/signup'>Sign up</Link>
              </div>
            </Paper>
          </Grid>
        </Grid>

        </>
    )
    
}

export default LoginForm;