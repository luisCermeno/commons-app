import {useState, useEffect, useRef} from 'react'
import {matchPath} from "react-router";
import history from '../history'


import {Grid, Paper} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import FaceTwoToneIcon from '@material-ui/icons/FaceTwoTone';

let gridstyle  = { border: "1px solid green"}
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
              alignItems="flex-start"
            >
              <Grid item xs={12} md={3} style={gridstyle}> 
                <Avatar style={{width: "100px", height: "100px", margin: "0 auto"}}>
                  <FaceTwoToneIcon/>
                </Avatar>
                <div style={{textAlign: "center"}}>{username}</div>
              </Grid>

              <Grid item xs={12} md={9} style={gridstyle}> 
                <div>First Name: {profile.first_name}</div>
                <div>Last Name: {profile.last_name}</div>
                <div>School: {profile.school}</div>
                <div>Major: {printChoice(profile.major, choices.MAJOR_CHOICES)}</div>
                <div>Year: {printChoice(profile.year, choices.YEAR_CHOICES)}</div>
                <div>Member since: {profile.timestamp}</div>
              </Grid>
              
              <Grid item xs={12} style={gridstyle}>
                <div>About:</div>
                <p>{profile.description}</p>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    
  )
}

export default Profile