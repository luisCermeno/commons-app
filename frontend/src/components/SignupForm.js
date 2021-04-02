import {useState} from 'react'

const SignupForm = props => {
  const [credentials, setcredentials] = useState({username: '', password: ''})
  const [profile, setprofile] = useState({
    first_name: '',
    last_name: '',
    school: 'DV',
    major: '',
    year: '',
    description: '',
  })
  const [showPassword, setshowPassword] = useState(false)
  const [loading, setloading] = useState(false)

  useEffect(() => {
    setloading(false)
  }, [props.errormsg])

  const handleSubmit = e => {
    e.preventDefault()
    setloading(true) 
    props.handle_signup({username: username, password: password}, profile)
  }


  const handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
        case 'username':
            setcredentials({...credentials, username: value})
            break
        case 'password':
            setcredentials({...credentials, password: value})
            break
        default:
            console.log('error on switch')
    }
  }

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword)
  }

  return (
    <form style={ {marginBottom: "20px",} } autoComplete="off" onSubmit={handleSubmit}>
      <div style={{marginBottom: "20px",}}>
        <TextField 
          id="standard-required" 
          label="Username" 
          name="username" 
          value={credentials.username} 
          onChange={handle_change}
          InputProps={{
            endAdornment:
            <InputAdornment position="end">
              <AccountCircleTwoToneIcon/>
            </InputAdornment>
          }}
        />
        <TextField 
          id="standard-password-input" 
          type={showPassword ? "text" : "password"} 
          label="Password" 
          name="password" 
          value={credentials.password} 
          onChange={handle_change}
          InputProps={{
            endAdornment:
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
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
        <Button style= {{width: "100%"}}type="submit" variant="contained" color="primary">Sign Up</Button>
      }
    </form>
  )
}


export default SignupForm
