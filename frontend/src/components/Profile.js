import {useState, useEffect, useRef} from 'react'
import {matchPath} from "react-router";
import history from '../history'


import {Grid, Paper} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import FaceTwoToneIcon from '@material-ui/icons/FaceTwoTone';
import CircularProgress from '@material-ui/core/CircularProgress';


let gridstyle  = { border: "1px solid green", padding: "1vh 1vw"}
let fieldstyle = { margin: "0.5vh 0"}

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
  const [loading, setloading] = useState(true)

  // ******** EFFECT HOOKS ********
  useEffect(() => {
    getprofile()
  }, [])

  const getprofile = () => {
    fetch(`http://localhost:8000/getprofile?username=${username}`, {
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`
      }
    })
    .then (res => res.json())
    .then (json => {
      setchoices(json.choices)
      setprofile(json.profile)
      setloading(false)
      console.log(json)
    })
  }


  const printChoice = (key, arr) => {
    var i
    for (i = 0; i < arr.length; i++) {
      if (arr[i][0] == key) return arr[i][1]
    }
  }

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
              style={{height: "35vh", border: "1px solid purple"}}
            >
              {loading?
                <CircularProgress style={{margin: "0 auto"}}/>
              :
              <>
                <Grid item xs={12} md={3} style={{...gridstyle, height: "60%"}}>
                  <Grid container style={{height: "100%"}} justify="center" alignItems="center">
                    <Grid item xs={12} style = {{height: "70%"}}>
                      <Avatar style={{height: "100%", width: "100%", margin: "0 auto"}}>
                        <FaceTwoToneIcon/>
                      </Avatar>
                    </Grid>
                    <Grid item xs={12}>
                      <div style={{textAlign: "center"}}> <b>{username}</b></div>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} md={9} style={{...gridstyle, height: "60%"}}>
                  <div style={fieldstyle}> <b>First Name:</b> {profile.first_name}</div>
                  <div style={fieldstyle}> <b>Last Name:</b> {profile.last_name}</div>
                  <div style={fieldstyle}> <b>School:</b> {profile.school}</div>
                  <div style={fieldstyle}> <b>Major:</b> {printChoice(profile.major, choices.MAJOR_CHOICES)}</div>
                  <div style={fieldstyle}> <b>Year:</b> {printChoice(profile.year, choices.YEAR_CHOICES)}</div>
                  <div style={fieldstyle}> <b>Member since:</b> {profile.timestamp}</div>
                </Grid>
                
                <Grid item xs={12} style={gridstyle}>
                  <div style={fieldstyle}> <b>About:</b> </div>
                  <div>{profile.description}</div>
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