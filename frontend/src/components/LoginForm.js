import { useState, useEffect } from 'react';

import {TextField, Button} from '@material-ui/core';
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from '@material-ui/core/CircularProgress';

import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';
import VisibilityOffTwoToneIcon from '@material-ui/icons/VisibilityOffTwoTone';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';

const LoginForm = props => {
  // ******** STATE HOOKS ********
  const [credentials, setcredentials] = useState({username: '', password: ''})
  const [showPassword, setshowPassword] = useState(false)
  const [loading, setloading] = useState(false)

  // ******** EFFECT HOOKS ********
  useEffect(() => {
    return () => {
      props.seterrormsg('')
    }
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    setloading(false)
  }, [props.errormsg])

  // ******** UTIL FUNCTIONS ********
  const handleSubmit = e => {
    e.preventDefault()
    setloading(true) 
    props.handle_login(credentials)
  }
  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setcredentials({...credentials, ...JSON.parse(`{"${name}": "${value}"}`)})
  }
  const handleClickShowPassword = () => {
    setshowPassword(!showPassword)
  }

  // ******** RENDER ********
  return (
    <form style={ {marginBottom: "20px",} } autoComplete="off" onSubmit={handleSubmit}>
      <div style={{marginBottom: "20px",}}>
        <TextField style={{width: "100%"}}
          required
          id="standard-required" 
          label="Username" 
          name="username" 
          value={credentials.username} 
          onChange={handleChange}
          InputProps={{
            endAdornment:
            <InputAdornment position="start">
              <AccountCircleTwoToneIcon/>
            </InputAdornment>
          }}
        />
        <TextField style={{width: "100%"}}
          required
          id="standard-password-input" 
          type={showPassword ? "text" : "password"} 
          label="Password" 
          name="password" 
          value={credentials.password} 
          onChange={handleChange}
          InputProps={{
            endAdornment:
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visi=bility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityTwoToneIcon /> : <VisibilityOffTwoToneIcon />}
                </IconButton>
              </InputAdornment>
          }}
        />
      </div>

      <h3>{props.errormsg}</h3>
      {/* button section */}
      {loading?
        <CircularProgress style={{margin: "0 auto"}}/>
      :
        <Button style= {{width: "100%"}}type="submit" variant="contained" color="primary">Log In</Button>
      }
    </form>
  )
}

export default LoginForm
