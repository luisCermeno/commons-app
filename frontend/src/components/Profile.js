import {useState, useEffect} from 'react'
import {matchPath} from "react-router";
import history from '../history'

import {TextField, Button} from '@material-ui/core';
import {Grid, Paper} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from "@material-ui/core/IconButton";

import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import FaceTwoToneIcon from '@material-ui/icons/FaceTwoTone';

const Profile = (props) => {
  // ******** CONSTANTS *********
  const username = matchPath(history.location.pathname, {
    path: "/profile/:username",
    exact: true,
    strict: false
  }).params.username;

  // ******** STATE HOOKS ********
  const [profile, setprofile] = useState({})
  const [choices, setchoices] = useState({})
  const [schools, setschools] = useState([])
  const [loading, setloading] = useState(true)
  const [edit, setedit] = useState({'description': false})

  // ******** EFFECT HOOKS ********
  useEffect(() => {
    getprofile()
    // eslint-disable-next-line 
  }, [])

  // ******** UTIL FUNCTIONS ********
  const getprofile = () => {
    fetch(`http://localhost:8000/getprofile?username=${username}`, {
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`
      }
    })
    .then (res => res.json())
    .then (json => {
      console.log(json)
      if (json.success) {
        setchoices(json.choices)
        setprofile(json.profile)
        setschools(json.schools)
        setloading(false)
      }
    })
  }
  const printChoice = (key, arr) => {
    var i
    for (i = 0; i < arr.length; i++) {
      if (arr[i][0] === key) return arr[i][1]
    }
  }
  const printSchool = (key, arr) => {
    var i
    for (i = 0; i < arr.length; i++) {
      if (arr[i].id === key) return arr[i].name
    }
  }
  const handleSubmit = e => {
    console.log(profile)
    e.preventDefault()
    setloading(true)
    fetch(props.host + 'editprofile/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(profile)
    })
    .then(res => {
      console.log(res)
      setloading(false)
      setedit({...edit, 'description': false})
    })
    
  }
  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setprofile({...profile, ...JSON.parse(`{"${name}": "${value}"}`)})
  }

  // ******** STYLING ************
  let styles = {
    grid: {
      padding: "1vh 1vw"
    },
    field: {
      margin: "0.5vh 0"
    }
  }
  
  // ******** RENDER ********
  return(
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{width: "100%", padding: "3vh 4vw", borderRadius: "15px", margin: "0 auto"}}>
            <Grid
              container
              justify="flex-start"
              alignItems="center"
              style={{minHeight: "35vh"}}
            >
              {loading?
                <CircularProgress style={{margin: "0 auto"}}/>
              :
              <>
                <Grid item xs={12} lg={3} style={{...styles.grid, height: "60%"}}>
                  <Grid container style={{height: "100%"}} justify="center" alignItems="center">
                    <Grid item xs={12} style = {{height: "70%"}}>
                      <Avatar style={{height: "100px", width: "100px", margin: "0 auto"}}>
                        <FaceTwoToneIcon/>
                      </Avatar>
                      <div style={{textAlign: "center"}}> <b>{username}</b></div>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} lg={9} style={{...styles.grid, height: "60%"}}>
                  <div style={styles.field}> <b>First Name:</b> {profile.first_name}</div>
                  <div style={styles.field}> <b>Last Name:</b> {profile.last_name}</div>
                  <div style={styles.field}> <b>School:</b> {printSchool(profile.school, schools)}</div>
                  <div style={styles.field}> <b>Major:</b> {printChoice(profile.major, choices.MAJOR_CHOICES)}</div>
                  <div style={styles.field}> <b>Year:</b> {printChoice(profile.year, choices.YEAR_CHOICES)}</div>
                  <div style={styles.field}> <b>Member since:</b> {profile.timestamp}</div>
                </Grid>
                
                <Grid item xs={12} style={styles.grid}>
                  <div style={styles.field}> 
                    <b>About:</b> 
                  </div>
                  {edit.description?
                    <form onSubmit={handleSubmit}>
                      <TextField
                        id="outlined-multiline-static"
                        onChange={handleChange}
                        value={profile.description}
                        name = 'description'
                        multiline
                        variant="outlined"
                        style = {{width: "100%", padding: "0 0"}}
                      />
                      <div style={{textAlign: "end"}}>
                      <Button type="submit" color="secondary">Save</Button>
                      </div>
                    </form>
                  :
                    <div>
                      {profile.description}
                      <IconButton
                      aria-label="edit"
                      style={{padding: "0 5px"}}
                      onClick={()=>{setedit({...edit, 'description': true})}}
                      >
                        <EditTwoToneIcon/>
                      </IconButton>
                    </div>
                  }
                </Grid>
              </>
              }
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    
  )
}

export default Profile